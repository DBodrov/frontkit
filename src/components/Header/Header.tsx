import classnames from 'classnames';
import React from 'react';

import styles from './Header.module.css';

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export function H1(props: HeaderProps): JSX.Element {
    const { children, className, style } = props;
    const cls = classnames(styles.header, styles.h1, className);
    return (
        <h1 className={cls} style={style} data-testid="Header-H1">
            {children}
        </h1>
    );
}

export function H2(props: HeaderProps): JSX.Element {
    const { children, className, style } = props;
    const cls = classnames(styles.header, styles.h2, className);
    return (
        <h2 className={cls} style={style} data-testid="Header-H2">
            {children}
        </h2>
    );
}
