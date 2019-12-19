import classnames from 'classnames';
import React, { ReactNode } from 'react';

import styles from './Box.module.css';

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to box to change styling */
    className?: string;
    /** Inline style objects passed to box wrapper */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default Box
     * */
    dataTestId?: string;
    /** Childrens passed to box wrapper */
    children: ReactNode;
}

export function Box({ className, style, dataTestId = 'Box', children, ...rest }: BoxProps): JSX.Element {
    return (
        <div data-testid={dataTestId} className={classnames(styles.wrapper, className)} style={style} {...rest}>
            {children}
        </div>
    );
}
