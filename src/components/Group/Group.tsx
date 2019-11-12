import classnames from 'classnames';
import React from 'react';

import styles from './Group.module.css';

interface GroupProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to group and children in order to change styling */
    className?: string;
    /** Inline style objects passed to group */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default Group-Container
     * */
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
