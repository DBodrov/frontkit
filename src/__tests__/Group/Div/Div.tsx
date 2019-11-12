import React from 'react';

import styles from './Div.module.css';

export function Div(props: React.BaseHTMLAttributes<HTMLSpanElement>): JSX.Element {
    const { children } = props;
    return <div className={styles.block}>{children}</div>;
}
