import * as React from 'react';
import styles from './Icons.module.css';

export type IconProps = {
    dataTestId?: string;
};
export function ErrorIcon({ dataTestId = 'input-error-icon' }: IconProps) {
    return (
        <div className={styles['error-wrapper']} data-testid={dataTestId}>
            <div className={styles['error-circle']}></div>
            <div className={styles['error-cross']}></div>
        </div>
    );
}
