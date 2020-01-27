import classnames from 'classnames';
import React, { CSSProperties } from 'react';
import { ThemeContext, ThemeTypes } from '../ThemeProvider';
import styles from './Button.module.css';

export enum StyleTypeProp {
    Default,
    UsedDefault,
    WhiteBodyWithBorder,
    WhiteBodyWithShadow,
}

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    /** Class names passed to Button in order to change styling */
    className?: string;
    /** Inline style objects passed to Button */
    style?: CSSProperties;
    /** ID attribute for QA Auto-tests
     * @default Button
     * */
    dataTestId?: string;
    styleType?: StyleTypeProp;
}

const getFinalStyles = (theme: ThemeTypes, style: ButtonProps['style'], styleType: StyleTypeProp) => {
    const mainColor = theme?.styles?.mainColor || '#69a6f1';
    const btnTextColor = theme?.styles?.btnTextColor || '#ffffff';
    switch (styleType) {
        case StyleTypeProp.WhiteBodyWithBorder:
            return { color: mainColor, border: `1px solid ${mainColor}`, backgroundColor: '#ffffff', ...style };
        case StyleTypeProp.WhiteBodyWithShadow:
            return {
                color: mainColor,
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 6px rgba(170, 187, 208, 0.16)',
                ...style,
            };
        case StyleTypeProp.UsedDefault:
            return { color: mainColor, backgroundColor: '#EAEEF4', ...style };
        case StyleTypeProp.Default:
        default:
            return { color: btnTextColor, backgroundColor: mainColor, ...style };
    }
};

export function Button(props: ButtonProps): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const { children, dataTestId = 'Button', className, style, styleType = StyleTypeProp.Default, ...rest } = props;
    const finalStyles = getFinalStyles(theme, style, styleType);
    const cls = classnames(styles.button, theme.className, className);
    return (
        <button className={cls} data-testid={dataTestId} style={finalStyles} {...rest}>
            {children}
        </button>
    );
}
