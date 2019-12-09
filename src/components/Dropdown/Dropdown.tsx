import React from 'react';
import styles from './Dropdown.module.css';
import { BackgroundProp, Input, SearchIcon } from '../Input';
import { Dimmer } from './Dimmer';

type IsSuitable<T> = (el: T, searchValue: string) => boolean;
type GetElement<T> = (el: T) => React.ReactElement<{ key: React.Key }>;

function useInputValue(): [string, React.ChangeEventHandler<HTMLInputElement>] {
    const [value, setValue] = React.useState('');
    const onChangeInput = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        },
        [setValue],
    );

    return [value, onChangeInput];
}

function useRenderedElements<T>(
    value: string,
    data: Props<T>['data'],
    isSuitable: Props<T>['isSuitable'],
    getElement: Props<T>['getElement'],
    inputThreshold: Props<T>['inputThreshold'],
    resultThreshold: Props<T>['resultThreshold'],
): [ReadonlyArray<React.ReactElement>, boolean] {
    const prefix = React.useRef<number>(0);
    const elements = React.useMemo(() => {
        prefix.current++;
        return data.map((el, id) => React.cloneElement(getElement(el), { key: `${prefix.current}_${id}` }));
    }, [data, getElement]);
    const searchableData: ReadonlyArray<React.ReactElement> = React.useMemo(() => {
        const res: Array<React.ReactElement> = [];
        if (value.length < inputThreshold) {
            return res;
        }
        for (let i = 0; i < data.length && res.length < resultThreshold; ++i) {
            if (isSuitable(data[i], value)) {
                res.push(elements[i]);
            }
        }
        return res;
    }, [data, isSuitable, value, inputThreshold, resultThreshold]);

    return [searchableData, searchableData.length > resultThreshold];
}

type ListProps<T> = {
    data: ReadonlyArray<ReturnType<GetElement<T>>>;
    More: React.ComponentType;

    showMore: boolean;
};
function List<T>({ data, More, showMore }: ListProps<T>): JSX.Element {
    return (
        <>
            {data}
            {showMore && <More />}
        </>
    );
}

type Props<T> = {
    data: ReadonlyArray<T>;
    getElement: GetElement<T>;
    isSuitable: IsSuitable<T>;
    inputThreshold: number;
    resultThreshold: number;
    More: React.ComponentType;
    NotFound: React.ComponentType;
} & React.HTMLAttributes<HTMLDivElement>;
export function Dropdown<T>({
    data,
    isSuitable,
    getElement,
    inputThreshold,
    More,
    resultThreshold,
    NotFound,
    ...rest
}: Props<T>): JSX.Element {
    const [value, onChangeInput] = useInputValue();
    const [moreElements, showMore] = useRenderedElements(value, data, isSuitable, getElement, inputThreshold, resultThreshold);

    const showDimmer = value.length >= inputThreshold;
    const found = value.length >= inputThreshold && moreElements.length > 0;
    const notFound = value.length >= inputThreshold && moreElements.length === 0;
    return (
        <div {...rest}>
            <Input
                background={showDimmer ? BackgroundProp.White : BackgroundProp.None}
                className={styles.input}
                LeftIcon={SearchIcon}
                value={value}
                onChange={onChangeInput}
            />
            {showDimmer && <Dimmer />}
            {found && <List data={moreElements} More={More} showMore={showMore} />}
            {notFound && <NotFound />}
        </div>
    );
}
