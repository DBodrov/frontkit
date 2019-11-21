import * as React from 'react';
import styles from './Icons.module.css';
import classnames from 'classnames';

export type IconProps = {
    dataTestId?: string;
};
export function ErrorIcon({ dataTestId = 'input-error-icon' }: IconProps) {
    return (
        <div className={styles.wrapper} data-testid={dataTestId}>
            <div className={styles['error-circle']}></div>
            <div className={styles['error-cross']}></div>
        </div>
    );
}

export function SuccessIcon({ dataTestId = 'input-success-icon' }: IconProps) {
    return (
        <div className={classnames(styles.wrapper, styles['success-wrapper'])} data-testid={dataTestId}>
            <div className={styles['success-stem']}></div>
            <div className={styles['success-kick']}></div>
        </div>
    );
}
