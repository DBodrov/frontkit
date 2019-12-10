import React from 'react';
import styles from './Dropdown.module.css';
import { BackgroundProp, Input, SearchIcon } from '../Input';
import { Dimmer } from './Dimmer';
import { Card, SplitType } from '../Card';

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

type ShowMore = boolean;
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
    const [searchableData, showMore]: [ReadonlyArray<React.ReactElement>, ShowMore] = React.useMemo(() => {
        const res: Array<React.ReactElement> = [];
        if (value.length < inputThreshold) {
            return [res, false];
        }
        for (let i = 0; i < data.length; ++i) {
            if (isSuitable(data[i], value)) {
                if (res.length >= resultThreshold) {
                    return [res, true];
                }
                res.push(elements[i]);
            }
        }
        return [res, false];
    }, [data, isSuitable, value, inputThreshold, resultThreshold]);

    return [searchableData, showMore];
}

function More(): JSX.Element {
    return <a className={styles.more}>Больше</a>;
}

type ListProps<T> = {
    data: ReadonlyArray<ReturnType<GetElement<T>>>;
    showMore: boolean;
};
function List<T>({ data, showMore }: ListProps<T>): JSX.Element {
    return (
        <>
            <Card
                className={styles.card}
                getSplitType={(splitOrder, size) => (size - 1 === splitOrder && showMore ? SplitType.Full : SplitType.Padding)}
            >
                {data}
                {showMore && <More />}
            </Card>
        </>
    );
}

type Props<T> = {
    data: ReadonlyArray<T>;
    getElement: GetElement<T>;
    isSuitable: IsSuitable<T>;
    inputThreshold: number;
    resultThreshold: number;
    NotFound: React.ComponentType;
} & React.HTMLAttributes<HTMLDivElement>;
export function Dropdown<T>({ data, isSuitable, getElement, inputThreshold, resultThreshold, NotFound, ...rest }: Props<T>): JSX.Element {
    const [value, onChangeInput] = useInputValue();
    const [elements, showMore] = useRenderedElements(value, data, isSuitable, getElement, inputThreshold, resultThreshold);

    const showDimmer = value.length >= inputThreshold;
    const found = showDimmer && elements.length > 0;
    const notFound = showDimmer && elements.length === 0;
    return (
        <div {...rest}>
            <Input
                background={showDimmer ? BackgroundProp.White : BackgroundProp.None}
                className={styles.input}
                LeftIcon={SearchIcon}
                value={value}
                onChange={onChangeInput}
            />
            {found && <List data={elements} showMore={showMore} />}
            {notFound && <NotFound />}
            {showDimmer && <Dimmer />}
        </div>
    );
}
