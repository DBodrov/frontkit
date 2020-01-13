import React, { CSSProperties } from 'react';
import { DEFAULT_LINK_COLOR } from '../../constants/style';
import { ThemeContext, ThemeTypes } from '../ThemeProvider';

interface LinkWrapperProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to link wrapper to change styling */
    className?: string;
    /** Inline style objects passed to link wrapper */
    style?: CSSProperties;
    /** ID attribute for QA Auto-tests
     * @default LinkWrapper
     * */
    dataTestId?: string;
}

const getThemeColor = (theme: ThemeTypes, style: React.StyleHTMLAttributes<HTMLElement>) => {
    if (!theme.styles || !theme.styles.linkColor) {
        return { color: DEFAULT_LINK_COLOR, ...style };
    }
    const { linkColor } = theme.styles;
    return { color: linkColor, ...style };
};

export function LinkWrapper({ children, className, style = {}, dataTestId = 'LinkWrapper', ...rest }: LinkWrapperProps): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const styles = getThemeColor(theme, style);
    return (
        <span {...rest} data-testid={dataTestId} className={className} style={styles}>
            {children}
        </span>
    );
}
