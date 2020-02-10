import React, { CSSProperties } from 'react';
import { ThemeContext } from '../ThemeProvider';

interface LinkWrapperProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Inline style objects passed to link wrapper */
    style?: CSSProperties;
    /** ID attribute for QA Auto-tests
     * @default LinkWrapper
     * */
    dataTestId?: string;
}

export function LinkWrapper({ children, style = {}, dataTestId = 'LinkWrapper', ...rest }: LinkWrapperProps): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const styles = { color: theme.linkColor, ...style };
    return (
        <span {...rest} data-testid={dataTestId} style={styles}>
            {children}
        </span>
    );
}
