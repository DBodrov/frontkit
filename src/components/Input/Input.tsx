import * as React from 'react';
import styles from './Input.module.css';
import classnames from 'classnames';

export enum BackgroundProp {
    Success,
    Error,
    None,
}

type Props = {
    value?: string;
    uncontrolled?: boolean;
    placeholder?: string;
    Icon?: React.ComponentType;
    background?: BackgroundProp;
    className?: string;
    style?: object;
    dataTestId?: string;
};

export function Input({ value, uncontrolled, placeholder, Icon, background, className, style, dataTestId, ...rest }: Props): JSX.Element {
    return (
        <input
            value={value}
            placeholder={placeholder}
            className={classnames(className, styles.input)}
            style={style}
            data-testid={dataTestId}
            {...rest}
        />
    );
}
