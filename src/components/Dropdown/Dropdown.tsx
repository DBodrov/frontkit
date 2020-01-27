import React from 'react';
import { getKeyCode as getCode } from '../../constants/events';
import { BaseDropdown, Type } from './BaseDropdown';

type GetElement<T> = (el: T) => React.ReactElement<{ key: React.Key; onClick: () => unknown }>;
type SelectHandler<T> = (el: T) => unknown;

type ShowMore = boolean;
function useRenderedElements<T>(
    value: string,
    data: Props<T>['data'],
    getElement: Props<T>['getElement'],
    inputThreshold: Props<T>['inputThreshold'],
    resultThreshold: Props<T>['resultThreshold'],
    onSelect: Props<T>['onSelect'],
): [ReadonlyArray<React.ReactElement>, boolean] {
    const prefix = React.useRef<number>(0);
    const elements = React.useMemo(() => {
        prefix.current++;
        return data.map((el, id) =>
            React.cloneElement(getElement(el), { key: `${prefix.current}_${id}`, onClick: () => onSelect && onSelect(el) }),
        );
    }, [data, getElement]);
    const [searchableData, showMore]: [ReadonlyArray<React.ReactElement>, ShowMore] = React.useMemo(() => {
        const res: Array<React.ReactElement> = [];
        if (value.length < inputThreshold) {
            return [res, false];
        }
        for (let i = 0; i < data.length; ++i) {
            if (res.length >= resultThreshold) {
                return [res, true];
            }
            res.push(elements[i]);
        }
        return [res, false];
    }, [data, value, inputThreshold, resultThreshold]);

    return [searchableData, showMore];
}

function getBaseDropdownType(showDimmer: boolean, elements: ReadonlyArray<unknown>, showMore: boolean, loading: boolean): Type {
    if (!showDimmer) {
        return Type.InputOnly;
    }
    if (loading) {
        return Type.Loading;
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
    inputThreshold: number;
    resultThreshold: number;
    dataTestId?: string;
    onSelect?: SelectHandler<T>;
    value: string;
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getKeyCode?: (key: string) => void;
    showMoreElement?: JSX.Element;
    clickOutSide?: () => void;
    onFocus?: () => void;
    loading?: boolean;
    showDimmer?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export function Dropdown<T>({
    dataTestId = 'dropdown',
    data,
    getElement,
    inputThreshold,
    resultThreshold,
    onSelect,
    getKeyCode,
    value,
    onChangeInput,
    loading = false,
    showDimmer = false,
    showMoreElement,
    clickOutSide,
    onFocus,
    ...rest
}: Props<T>): JSX.Element {
    const [elements, showMore] = useRenderedElements(value, data, getElement, inputThreshold, resultThreshold, onSelect);

    const type = getBaseDropdownType(showDimmer, elements, showMore, loading);

    const handleKeyDown = React.useCallback(
        event => {
            switch (getCode(event)) {
                case 'Enter':
                case 13:
                    getKeyCode && getKeyCode('Enter');
                    break;
                case 'ArrowDown':
                case 40:
                    getKeyCode && getKeyCode('ArrowDown');
                    break;
                case 'ArrowUp':
                case 38:
                    getKeyCode && getKeyCode('ArrowUp');
                    break;
                default:
                    break;
            }
        },
        [getKeyCode],
    );

    return (
        <BaseDropdown
            {...rest}
            dataTestId={dataTestId}
            handleKeyDown={handleKeyDown}
            data={elements}
            inputValue={value}
            onChangeInput={onChangeInput}
            showMoreElement={showMoreElement}
            clickOutSide={clickOutSide}
            onFocus={onFocus}
            type={type}
        />
    );
}
