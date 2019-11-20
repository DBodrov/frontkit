import classnames from 'classnames';
import React from 'react';

import styles from './Spinner.module.css';

interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to spinner wrapper to change styling */
    className?: string;
    /** Class names passed to spinner circles to change styling */
    circleClassName?: string;
    /** Inline style objects passed to spinner wrapper */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** String passed to spinner to change color */
    color?: string;
    /** ID attribute for QA Auto-tests
     * @default Spinner
     * */
    dataTestId?: string;
}

interface CircleProps extends React.HTMLAttributes<HTMLElement> {
    color: string;
    className?: string;
}

const creacteCircleClass = (className?: string) => classnames(styles.circle, styles.lineAnimation, className);

const Circle = ({ color, className }: CircleProps) => <div className={creacteCircleClass(className)} style={{ backgroundColor: color }} />;

export function Spinner({ className, circleClassName, style, color = '#79b5ff', dataTestId = 'Spinner' }: SpinnerProps): JSX.Element {
    return (
        <div data-testid={dataTestId} className={className} style={style}>
            <div className={styles.spinner}>
                <Circle color={color} className={circleClassName} />
                <Circle color={color} className={circleClassName} />
                <Circle color={color} className={circleClassName} />
                <Circle color={color} className={circleClassName} />
            </div>
        </div>
    );
}
