import React from 'react';

import styles from './Group.module.css';

export function Group(props: React.BaseHTMLAttributes<HTMLSpanElement>): JSX.Element {
    const { children } = props;
    return <div className={styles.group}>{children}</div>;
}
