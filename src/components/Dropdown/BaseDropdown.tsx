import React from 'react';
import styles from './Dropdown.module.css';
import { BackgroundProp, Input, SearchIcon } from '../Input';
import { Dimmer } from './Dimmer';
import { Card, SplitType } from '../Card';

function More(): JSX.Element {
    return <a className={styles.more}>Больше</a>;
}

type ListProps<T> = {
    data: Props['data'];
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

export enum Type {
    InputOnly,
    NotFound,
    Data,
    DataAndMore,
}

type Props = {
    inputValue: string;
    data: ReadonlyArray<React.ReactElement<{ key: React.Key }>>;
    type: Type;
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showOutline: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export function BaseDropdown({ inputValue, data, onChangeInput, type, ...rest }: Props): JSX.Element {
    return (
        <div {...rest}>
            <Input
                background={type === Type.InputOnly ? BackgroundProp.None : BackgroundProp.White}
                className={styles.input}
                LeftIcon={SearchIcon}
                value={inputValue}
                onChange={onChangeInput}
                showOutline={type === Type.InputOnly}
            />
            {type === Type.Data || (type === Type.DataAndMore && <List data={data} showMore={type === Type.DataAndMore} />)}
            {type === Type.NotFound && <div>not found</div>}
            {type !== Type.InputOnly && <Dimmer />}
        </div>
    );
}
