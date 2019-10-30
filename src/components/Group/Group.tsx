import React from 'react';

import styles from './Group.module.css';
type GroupProps = React.BaseHTMLAttributes<HTMLSpanElement> & {
    dataTestId?: string;
};

export function Group(props: GroupProps): JSX.Element {
    const { children, dataTestId = 'Group-Container' } = props;
    return (
        <div className={styles.group} data-test-id={dataTestId}>
            {children}
        </div>
    );
}
