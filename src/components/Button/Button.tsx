import classnames from 'classnames';
import React from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to Button in order to change styling */
    className?: string;
    /** Inline style objects passed to Button */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default Button
     * */
    dataTestId?: string;
}

export function Button(props: ButtonProps): JSX.Element {
    const { children, dataTestId = 'Button', className, style, ...rest } = props;
    const cls = classnames(styles.button, className);
    return (
        <button className={cls} data-testid={dataTestId} style={style} {...rest}>
            {children}
        </button>
    );
}
