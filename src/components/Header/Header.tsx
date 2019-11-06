import classnames from 'classnames';
import React from 'react';

import styles from './Header.module.css';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to h1/h2 in order to change styling */
    className?: string;
    /** Inline style objects passed to h1/h2 */
    style?: React.StyleHTMLAttributes<HTMLElement>;
}

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
