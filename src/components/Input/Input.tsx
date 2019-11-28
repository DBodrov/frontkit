import * as React from 'react';
import styles from './Input.module.css';
import classnames from 'classnames';
import { IconProps } from './Icons';

export enum BackgroundProp {
    Success,
    Error,
    None,
}

type Props = {
    value?: string;
    uncontrolled?: boolean;
    placeholder?: string;
    Icon?: React.ComponentType<IconProps>;
    background?: BackgroundProp;
    className?: string;
    style?: object;
    dataTestId?: string;
};

function getBackgroundClass(background?: BackgroundProp) {
    return classnames({
        [styles.error]: background === BackgroundProp.Error,
        [styles.success]: background === BackgroundProp.Success,
    });
}

export function Input({ value, uncontrolled, placeholder, Icon, background, className, style, dataTestId, ...rest }: Props): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <input
                value={value}
                placeholder={placeholder}
                className={classnames(className, styles.input, getBackgroundClass(background))}
                style={style}
                data-testid={dataTestId}
                {...rest}
            />
            {Icon && (
                <div className={styles.icon}>
                    <Icon />
                </div>
            )}
        </div>
    );
}