import classnames from 'classnames';
import React from 'react';

import styles from './Group.module.css';

interface GroupProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    style?: React.StyleHTMLAttributes<HTMLElement>;
    dataTestId?: string;
}

export function Group(props: GroupProps): JSX.Element {
    const { children, dataTestId = 'Group-Container', className, style } = props;
    const cls = classnames(styles.group, className);
    return (
        <div className={cls} data-testid={dataTestId} style={style}>
            {children}
        </div>
    );
}
