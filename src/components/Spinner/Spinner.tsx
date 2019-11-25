import classnames from 'classnames';
import React from 'react';
import { ThemeContext } from '../ThemeProvider';

import styles from './Spinner.module.css';

interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to spinner wrapper to change styling */
    className?: string;
    /** Class names passed to spinner circles to change styling */
    circleClassName?: string;
    /** Inline style objects passed to spinner wrapper */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** Inline style objects passed to spinner circles */
    circleStyle?: React.StyleHTMLAttributes<HTMLElement>;
    /** String passed to spinner to change color */
    color?: string;
    /** ID attribute for QA Auto-tests
     * @default Spinner
     * */
    dataTestId?: string;
}

interface CircleProps extends React.HTMLAttributes<HTMLElement> {
    color?: string;
    className?: string;
    circleStyle?: object;
}

const createCircleClass = (className?: string, themeClassName?: string) =>
    classnames(styles.circle, styles.lineAnimation, className, themeClassName);

const Circle = ({ color, className, circleStyle }: CircleProps) => (
    <div className={className} style={{ ...circleStyle, backgroundColor: color }} />
);

export function Spinner({ className, circleClassName, style, circleStyle, color, dataTestId = 'Spinner' }: SpinnerProps): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const finalColor = color || (theme.styles && theme.styles.mainColor) || '#79b5ff';
    const finalCircleClassNames = createCircleClass(circleClassName, theme.className);
    return (
        <div data-testid={dataTestId} className={className} style={style}>
            <div className={styles.spinner}>
                <Circle color={finalColor} className={finalCircleClassNames} circleStyle={circleStyle} />
                <Circle color={finalColor} className={finalCircleClassNames} circleStyle={circleStyle} />
                <Circle color={finalColor} className={finalCircleClassNames} circleStyle={circleStyle} />
                <Circle color={finalColor} className={finalCircleClassNames} circleStyle={circleStyle} />
            </div>
        </div>
    );
}
