import React from 'react';

import styles from './TestDiv.module.css';

export function TestDiv(props: React.BaseHTMLAttributes<HTMLSpanElement>): JSX.Element {
    const { children } = props;
    return <div className={styles.block}>{children}</div>;
}
