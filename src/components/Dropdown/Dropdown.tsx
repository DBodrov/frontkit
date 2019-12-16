import React from 'react';
import { BaseDropdown, Type } from './BaseDropdown';

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

function getBaseDropdownType(showDimmer: boolean, elements: ReadonlyArray<unknown>, showMore: boolean): Type {
    if (!showDimmer) {
        return Type.InputOnly;
    }
    if (elements.length <= 0) {
        return Type.NotFound;
    }
    if (showMore) {
        return Type.DataAndMore;
    }
    return Type.Data;
}

export type Props<T> = {
    data: ReadonlyArray<T>;
    getElement: GetElement<T>;
    isSuitable: IsSuitable<T>;
    inputThreshold: number;
    resultThreshold: number;
    dataTestId?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export function Dropdown<T>({
    dataTestId = 'dropdown',
    data,
    isSuitable,
    getElement,
    inputThreshold,
    resultThreshold,
    ...rest
}: Props<T>): JSX.Element {
    const [value, onChangeInput] = useInputValue();
    const [elements, showMore] = useRenderedElements(value, data, isSuitable, getElement, inputThreshold, resultThreshold);

    const showDimmer = value.length >= inputThreshold;
    const type = getBaseDropdownType(showDimmer, elements, showMore);
    return <BaseDropdown {...rest} dataTestId={dataTestId} data={elements} inputValue={value} onChangeInput={onChangeInput} type={type} />;
}
