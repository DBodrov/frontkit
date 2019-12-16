import React from 'react';
import styles from './Dropdown.module.css';
import { BackgroundProp, Input, SearchIcon } from '../Input';
import { Dimmer } from './Dimmer';
import { Card, SplitType } from '../Card';
import { Spinner } from '../Spinner';

function More({ dataTestId }: { dataTestId: string }): JSX.Element {
    return (
        <a className={styles.more} data-testid={dataTestId}>
            Больше
        </a>
    );
}

type ListProps<T> = {
    data: Props['data'];
    showMore: boolean;
    dataTestId: string;
};
function List<T>({ dataTestId, data, showMore }: ListProps<T>): JSX.Element {
    return (
        <Card
            dataTestId={dataTestId}
            className={styles.card}
            getSplitType={(splitOrder, size) => (size - 1 === splitOrder && showMore ? SplitType.Full : SplitType.Padding)}
        >
            {data}
            {showMore && <More dataTestId={dataTestId + '-more'} />}
        </Card>
    );
}

function NotFound({ dataTestId }: { dataTestId: string }): JSX.Element {
    return (
        <Card className={styles.card} dataTestId={dataTestId}>
            <p>По запросу ничего не найдено</p>
        </Card>
    );
}

function Loading(): JSX.Element {
    return (
        <Card className={styles.card}>
            <Spinner />
        </Card>
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
    data: ReadonlyArray<React.ReactElement<{ key: React.Key }>>;
    type: Type;
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    dataTestId: string;
} & React.HTMLAttributes<HTMLDivElement>;
export function BaseDropdown({ dataTestId, inputValue, data, onChangeInput, type, ...rest }: Props): JSX.Element {
    return (
        <div {...rest} data-testid={dataTestId}>
            <Input
                background={type === Type.InputOnly ? BackgroundProp.None : BackgroundProp.White}
                className={styles.input}
                LeftIcon={SearchIcon}
                value={inputValue}
                onChange={onChangeInput}
                showOutline={type === Type.InputOnly}
                dataTestId={dataTestId + '-input'}
            />
            {(type === Type.Data || type === Type.DataAndMore) && (
                <List dataTestId={dataTestId + '-data'} data={data} showMore={type === Type.DataAndMore} />
            )}
            {type === Type.NotFound && <NotFound dataTestId={dataTestId + '-not-found'} />}
            {type === Type.Loading && <Loading />}
            {type !== Type.InputOnly && <Dimmer dataTestId={dataTestId + '-dimmer'} />}
        </div>
    );
}
