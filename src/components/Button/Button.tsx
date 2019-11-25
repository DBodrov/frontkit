import classnames from 'classnames';
import React from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
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
    const theme = React.useContext(ThemeContext);
    const { children, dataTestId = 'Button', className, style, ...rest } = props;
    const finalStyles = {
        ...(theme.styles && { backgroundColor: theme.styles.backgroundColor }),
        ...style,
    };
    const cls = classnames(styles.button, theme.className, className);
    return (
        <button className={cls} data-testid={dataTestId} style={finalStyles} {...rest}>
            {children}
        </button>
    );
}
