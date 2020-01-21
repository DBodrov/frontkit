import cn from 'classnames';
import React, { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Arrow, ArrowTypes } from '../Arrow';
import { Box } from '../Box';
import { Input, SmallInput } from '../Input';
import { LinkWrapper } from '../LinkWrapper';
import styles from './Select.module.css';
import { getKeyCode } from '../../constants/events';
import { useClickOutside } from '../../hooks/useClickOutsideSelect';

export interface ElementTypes {
    id: string | number;
    value: string;
    name: string;
    onClick?: () => unknown;
}

interface SelectInterface {
    elements: ElementTypes[];
    filter?: () => unknown;
    notFoundText?: string;
    defaultId?: string | number;
    name: string;
    placeholder?: string;
    countToShowElements?: number;
    small?: boolean;
    dataTestId?: string;
}

const ButtonList = ({ data, hoverValue }: { data: ElementTypes[]; hoverValue: string }) => {
    const arr = data.map(el => {
        return (
            <LinkWrapper
                key={el.id}
                data-testid="Select-Item"
                data-value={el.value}
                className={cn(styles.item, { [styles.hover_item]: hoverValue === el.value })}
                onClick={el.onClick}
            >
                {el.value}
            </LinkWrapper>
        );
    });
    return arr;
};

const trueF = () => true;
const defaultNotFoundText = 'button not found';
export const Select = ({
    elements,
    filter = trueF,
    notFoundText = defaultNotFoundText,
    dataTestId = 'Select',
    defaultId,
    name,
    small = false,
    placeholder = 'Выберите вариант',
    countToShowElements = 3,
    ...props
}: SelectInterface) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const scrollbar = React.useRef<Scrollbars>(null);
    const [value, setValue] = React.useState('');
    // не использовать top и bottom из элементов массива allRects. sideEffects.
    const [allRects, setAllRects] = React.useState([]);
    const [hoverValue, setHoverValue] = React.useState('');
    const [oldValue, setOldValue] = React.useState('');

    const handleClick = React.useCallback(
        el => {
            setValue(el.value);
            setOldValue('');
        },
        [setValue, setOldValue],
    );

    const selectIsOpen = oldValue !== '';
    const listData = elements
        .filter(el => selectIsOpen && el.value && el.value.toLowerCase().includes(value.toLowerCase()))
        .map((el, id) => ({
            id,
            value: el.value,
            onClick: () => {
                handleClick(el);
            },
        }));

    React.useEffect(() => {
        // Определение первоначального значения селекта
        const element = elements.find(el => el.id === defaultId);
        setValue(element ? element.value : elements[0].value);
    }, []);

    React.useEffect(() => {
        // Проматывание селекта до элемента, который выбран стрелочками.
        const element = document.querySelector(`[data-value='${hoverValue}']`);
        if (!(hoverValue && scrollbar.current && element)) return;
        const elementRect = element.getBoundingClientRect();
        const elementRectIndex = listData.findIndex(el => el.value === hoverValue);
        const containerRect = scrollbar.current.view.getBoundingClientRect();
        if (elementRectIndex === 0) {
            scrollbar.current.scrollToTop();
        } else if (elementRect.bottom > containerRect.bottom) {
            scrollbar.current.scrollTop(
                allRects.reduce((sum, el, i) => (i < elementRectIndex && i > countToShowElements - 2 ? sum + el.height : sum), 0),
            );
        } else if (elementRect.top < containerRect.top) {
            scrollbar.current.scrollTop(allRects.reduce((sum, el, i) => (i < elementRectIndex ? sum + el.height : sum), 0));
        }
    }, [hoverValue, scrollbar.current, allRects, listData.length]);

    React.useEffect(() => {
        // При изменении списка для отображения получаем координаты всех
        // элементов, чтобы потом не делать кучу запросов для каждого
        const elements = document.querySelectorAll('[data-value]');
        setAllRects(Array.from(elements).map(el => el.getBoundingClientRect()));
    }, [listData.length, setAllRects]);

    const handleReload = React.useCallback(() => {
        if (oldValue) {
            setValue(oldValue);
            setOldValue('');
        }
    }, [setValue, oldValue, setOldValue]);

    const handleChange = React.useCallback(
        event => {
            setValue(event.target.value);
        },
        [filter, elements],
    );

    const handleFocus = React.useCallback(() => {
        if (oldValue === '' && elements.find(x => x.value && x.value.toLowerCase() === value.toLowerCase())) {
            setHoverValue(value);
            setOldValue(value);
            setValue('');
        }
    }, [elements, value, setOldValue, setValue, oldValue]);

    useClickOutside(wrapperRef, handleReload);

    const handleKeyDown = React.useCallback(
        event => {
            const elemId = listData.findIndex(el => el.value === hoverValue) || 0;
            switch (getKeyCode(event)) {
                case 'Enter':
                case 13:
                    event.target.blur();
                    break;
                case 'ArrowDown':
                case 40:
                    setHoverValue(elemId < listData.length - 1 ? listData[elemId + 1].value : listData[0].value);
                    break;
                case 'ArrowUp':
                case 38:
                    setHoverValue(elemId > 0 ? listData[elemId - 1].value : listData[listData.length - 1].value);
                    break;
                default:
                    break;
            }
        },
        [hoverValue, setHoverValue, listData.length],
    );

    const buttonHover = React.useCallback(
        event => {
            const { value } = event.target.dataset;
            setHoverValue(value);
        },
        [setHoverValue],
    );

    return (
        <div ref={wrapperRef} style={{ position: 'relative' }} data-testid={dataTestId + 'Wrapper'}>
            <A3InputSelect
                {...props}
                RightIcon={() => <Arrow type={oldValue.length === 0 ? ArrowTypes.Down : ArrowTypes.Up} />}
                autocomplete="off"
                name={name}
                small={small}
                placeholder={placeholder}
                value={value}
                dataTestId={dataTestId}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onChange={handleChange}
            />
            {listData.length > 0 && (
                <SelectItemsWrapper
                    data-testid="CF-Select-ItemsWrapper"
                    scrollbar={scrollbar}
                    buttonHover={buttonHover}
                    countToShowElements={countToShowElements}
                >
                    <ButtonList data={listData} hoverValue={hoverValue} />
                </SelectItemsWrapper>
            )}
        </div>
    );
};

interface ItemsWrapperTypes {
    children: ReactNode;
    scrollbar: React.RefObject<Scrollbars>;
    buttonHover: (event: unknown) => void;
    countToShowElements: number;
}

const SelectItemsWrapper = ({ children, scrollbar, buttonHover, countToShowElements }: ItemsWrapperTypes) => {
    const selectEl = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState(0);

    React.useEffect(() => {
        if (selectEl.current && selectEl.current.children) {
            setHeight(
                Array.from(selectEl.current.children)
                    .slice(0, countToShowElements)
                    .map(el => el.getBoundingClientRect())
                    .reduce((sum, item) => sum + item.height, 0) - 1,
            );
        }
    }, [children, setHeight]);

    return (
        <Box className={styles.wrapper} style={{ minHeight: height }} onMouseOver={buttonHover}>
            <div style={{ padding: 0 }}>
                <Scrollbars
                    ref={scrollbar}
                    style={{ height }}
                    renderTrackHorizontal={props => <div {...props} style={{ display: 'none' }} />}
                    renderThumbHorizontal={props => <div {...props} style={{ display: 'none' }} />}
                    renderView={props => <div {...props} />}
                >
                    <div ref={selectEl} className={styles.select_items_wrapper}>
                        {children}
                    </div>
                </Scrollbars>
            </div>
        </Box>
    );
};

const propsWithoutSmall = ({ small, ...rest }) => rest;

const A3InputSelect = (props: SelectInterface) =>
    props.small ? <SmallInput {...propsWithoutSmall(props)} /> : <Input {...propsWithoutSmall(props)} />;
