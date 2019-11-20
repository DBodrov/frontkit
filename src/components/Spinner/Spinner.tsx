import classnames from 'classnames';
import React from 'react';

import styles from './Spinner.module.css';

interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to spinner wrapper to change styling */
    className?: string;
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
}

const circleCls = classnames(styles.circle, styles.lineAnimation);

const Circle = ({ color }: CircleProps) => <div className={circleCls} style={{ backgroundColor: color }} />;

export function Spinner({ className, style, color = '#79b5ff', dataTestId = 'Spinner' }: SpinnerProps): JSX.Element {
    return (
        <div data-testid={dataTestId} className={className} style={style}>
            <div className={styles.spinner}>
                <Circle color={color} />
                <Circle color={color} />
                <Circle color={color} />
                <Circle color={color} />
            </div>
        </div>
    );
}
