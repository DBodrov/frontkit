import cn from 'classnames';
import React, { FormEvent, ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Arrow, ArrowTypes } from '../Arrow';
import { Box } from '../Box';
import { Input, SmallInput } from '../Input';
import { LinkWrapper } from '../LinkWrapper';
import styles from './Select.module.css';
import { getKeyCode } from '../../constants/events';
import { useClickOutside } from '../../hooks/useClickOutsideSelect';

export interface ElementTypes {
    value: string;
    name: string;
    onClick?: () => unknown;
}

interface SelectInterface extends React.ComponentProps<typeof Input> {
    elements: ElementTypes[];
    defaultId?: string | number;
    name: string;
    placeholder?: string;
    countToShowElements?: number;
    small?: boolean;
    dataTestId?: string;
}

const ButtonList = ({ data, hoverValue }: { data: ElementTypes[]; hoverValue: string }) => {
    const arr = data.map(el => (
        <LinkWrapper
            key={el.name + el.value}
            dataTestId={'Select-Item-' + el.name}
            data-value={el.value}
            className={cn(styles.item, { [styles.hover_item]: hoverValue === el.value })}
            onClick={el.onClick}
        >
            {el.value}
        </LinkWrapper>
    ));
    return arr;
};

export const Select = ({
    elements,
    dataTestId = 'Select',
    defaultId,
    name,
    small = false,
    placeholder = 'Выберите вариант',
    onChange,
    countToShowElements = 3,
    className,
    ...props
}: SelectInterface) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const scrollbar = React.useRef<Scrollbars>(null);
    const [value, setValue] = React.useState('');
    // не использовать top и bottom из элементов массива allRects. sideEffects.
    const [allRects, setAllRects] = React.useState<DOMRect[]>([]);
    const [hoverValue, setHoverValue] = React.useState('');
    const [oldValue, setOldValue] = React.useState('');

    const handleClick = React.useCallback(
        el => {
            setValue(el.value);
            setOldValue('');
            onChange && onChange(({ target: { value: el.name } } as unknown) as FormEvent<HTMLInputElement>);
        },
        [setValue, setOldValue],
    );

    const selectIsOpen = oldValue !== '';
    const listData = elements
        .filter(el => selectIsOpen && el.value?.toLowerCase().includes(value.toLowerCase()))
        .map(el => ({
            id: el.name,
            value: el.value,
            onClick: () => {
                handleClick(el);
            },
        }));

    React.useEffect(() => {
        // Определение первоначального значения селекта
        const element = elements.find(el => el.name === defaultId);
        setValue(element?.value || elements[0].value);
    }, []);

    React.useEffect(() => {
        // Проматывание селекта до элемента, который выбран стрелочками.
        const element = wrapperRef.current?.querySelector(`[data-value='${hoverValue}']`);
        const scrollbarsView = wrapperRef.current?.querySelector(`[data-value='ScrollbarsView']`);
        if (!(hoverValue && scrollbar.current && element && scrollbarsView)) return;
        const elementRect = element.getBoundingClientRect();
        const elementRectIndex = listData.findIndex(el => el.value === hoverValue);
        const containerRect = scrollbarsView.getBoundingClientRect();
        if (elementRectIndex === 0) {
            scrollbar.current.scrollToTop();
        } else if (elementRect.bottom > containerRect.bottom) {
            scrollbar.current.scrollTop(
                allRects.reduce((sum, el, i) => (i < elementRectIndex && i > countToShowElements - 2 ? sum + el.height : sum), 0),
            );
        } else if (elementRect.top < containerRect.top) {
            scrollbar.current.scrollTop(allRects.reduce((sum, el, i) => (i < elementRectIndex ? sum + el.height : sum), 0));
        }
    }, [hoverValue, scrollbar.current, allRects, listData.length, wrapperRef]);

    React.useEffect(() => {
        // При изменении списка для отображения получаем координаты всех
        // элементов, чтобы потом не делать кучу запросов для каждого
        const elements = wrapperRef.current?.querySelectorAll(`.${styles.item}`);
        elements && setAllRects(Array.from(elements).map(el => el.getBoundingClientRect()));
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
        [elements, onChange],
    );

    const handleFocus = React.useCallback(() => {
        if (oldValue === '' && elements.find(x => x.value?.toLowerCase() === value.toLowerCase())) {
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
                    handleClick(listData[elemId]);
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
        [hoverValue, setHoverValue, listData.length, setOldValue],
    );

    const buttonHover = React.useCallback(
        event => {
            const { value } = event.target.dataset;
            setHoverValue(value);
        },
        [setHoverValue],
    );
    // OPEN ISSUES TS2605: JSX element type 'Element[]' is not a constructor function for JSX elements.
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const BL = <ButtonList data={listData} hoverValue={hoverValue} />;

    return (
        <div ref={wrapperRef} style={{ position: 'relative' }} className={className} data-testid={dataTestId + 'Wrapper'}>
            <A3InputSelect
                {...props}
                RightIcon={() => <Arrow type={oldValue.length === 0 ? ArrowTypes.Down : ArrowTypes.Up} />}
                type="text"
                autoComplete="off"
                name={name}
                small={small.toString()}
                placeholder={placeholder}
                value={value}
                dataTestId={dataTestId}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onChange={handleChange}
            />
            {listData.length > 0 && (
                <SelectItemsWrapper
                    data-testid="Select-ItemsWrapper"
                    scrollbar={scrollbar}
                    buttonHover={buttonHover}
                    countToShowElements={countToShowElements}
                >
                    {BL}
                </SelectItemsWrapper>
            )}
        </div>
    );
};

interface ItemsWrapperTypes {
    children: ReactNode;
    scrollbar: React.RefObject<Scrollbars>;
    buttonHover?: (event: unknown) => void;
    countToShowElements: number;
    changeWidth?: boolean;
    className?: string;
}

export const SelectItemsWrapper = ({
    className,
    children,
    scrollbar,
    buttonHover,
    countToShowElements,
    changeWidth = false,
}: ItemsWrapperTypes) => {
    const selectEl = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState(0);
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
        if (selectEl.current?.children) {
            const arr = Array.from(selectEl.current.children).map(el => el.getBoundingClientRect());
            setHeight(arr.reduce((sum, item, index) => (countToShowElements > index ? sum + item.height : sum), 0) - 1);
            if (changeWidth) {
                setWidth(arr.reduce((max, item) => (item.width > max ? item.width : max), 0) + 30);
                // ниже грязный хак, потому что по другому не работает. Ещё подумаю что с этим можно сделать
                selectEl.current.style.display = 'flex';
                selectEl.current.style.flexDirection = 'column';
            }
        }
    }, [children, setHeight, setWidth, changeWidth]);

    return (
        <Box
            className={cn(styles.wrapper, className)}
            style={{ minHeight: height, ...(changeWidth && { maxWidth: width }) }}
            onMouseOver={buttonHover}
        >
            <div style={{ padding: 0 }}>
                <Scrollbars
                    ref={scrollbar}
                    style={{ height }}
                    renderTrackHorizontal={props => <div {...props} style={{ display: 'none' }} />}
                    renderThumbHorizontal={props => <div {...props} style={{ display: 'none' }} />}
                    renderView={props => <div {...props} data-value="ScrollbarsView" data-testid="ScrollbarsView" />}
                >
                    <div ref={selectEl} className={styles.select_items_wrapper}>
                        {children}
                    </div>
                </Scrollbars>
            </div>
        </Box>
    );
};

interface A3InputSelectProps extends React.ComponentProps<typeof Input> {
    small: string;
}

const A3InputSelect = (props: A3InputSelectProps) => (props.small === 'true' ? <SmallInput {...props} /> : <Input {...props} />);
