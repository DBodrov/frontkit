import React from 'react';

import styles from './Header.module.css';

export function Header(props: React.BaseHTMLAttributes<HTMLSpanElement>): JSX.Element {
    const { children } = props;
    return <span className={styles.header}>{children}</span>;
}
