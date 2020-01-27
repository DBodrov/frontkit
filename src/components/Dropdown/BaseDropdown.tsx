import React from 'react';
import styles from './Dropdown.module.css';
import { BackgroundProp, Input, SearchIcon } from '../Input';
import { Dimmer } from '../Dimmer';
import { Box, SplitType } from '../Box';
import { Spinner } from '../Spinner';

type ListProps<T> = {
    data: Props['data'];
    showMore: boolean;
    dataTestId: string;
    ShowMoreElement?: React.ComponentType;
};
function List<T>({ dataTestId, data, showMore, ShowMoreElement }: ListProps<T>): JSX.Element {
    return (
        <Box
            dataTestId={dataTestId}
            className={styles.card}
            getSplitType={(splitOrder, size) => (size - 1 === splitOrder && showMore ? SplitType.Full : SplitType.Padding)}
        >
            {data}
            {showMore && ShowMoreElement && <ShowMoreElement />}
        </Box>
    );
}

function NotFound({ dataTestId }: { dataTestId: string }): JSX.Element {
    return (
        <Box className={styles.card} dataTestId={dataTestId}>
            <div>По запросу ничего не найдено</div>
        </Box>
    );
}

function Loading({ dataTestId }: { dataTestId: string }): JSX.Element {
    return (
        <Box className={styles.card} dataTestId={dataTestId}>
            <Spinner />
        </Box>
    );
}

export enum Type {
    InputOnly,
    NotFound,
    Data,
    DataAndMore,
    Loading,
}

type Props = {
    inputValue: string;
    placeholder?: string;
    data: ReadonlyArray<React.ReactElement<{ key: React.Key }>>;
    type: Type;
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    dataTestId: string;
    showMoreElement?: React.ComponentType;
    clickOutSide?: () => void;
    onFocus?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;
export function BaseDropdown({
    dataTestId,
    inputValue,
    data,
    showMoreElement,
    handleKeyDown,
    clickOutSide,
    onChangeInput,
    type,
    placeholder,
    onFocus,
    ...rest
}: Props): JSX.Element {
    return (
        <div {...rest} data-testid={dataTestId}>
            <Input
                background={type === Type.InputOnly ? BackgroundProp.None : BackgroundProp.White}
                className={styles.input}
                LeftIcon={SearchIcon}
                value={inputValue}
                onChange={onChangeInput}
                showOutline={type === Type.InputOnly}
                onKeyDown={handleKeyDown}
                dataTestId={dataTestId + '-input'}
                onFocus={onFocus}
                placeholder={placeholder}
            />
            {(type === Type.Data || type === Type.DataAndMore) && (
                <List
                    dataTestId={dataTestId + '-data'}
                    ShowMoreElement={showMoreElement}
                    data={data}
                    showMore={type === Type.DataAndMore}
                />
            )}
            {type === Type.NotFound && <NotFound dataTestId={dataTestId + '-not-found'} />}
            {type === Type.Loading && <Loading dataTestId={dataTestId + '-loading'} />}
            {type !== Type.InputOnly && <Dimmer clickOutSide={clickOutSide} dataTestId={dataTestId + '-dimmer'} />}
        </div>
    );
}
