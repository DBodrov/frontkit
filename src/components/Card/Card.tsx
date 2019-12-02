import classnames from 'classnames';
import React, { ReactNode } from 'react';

import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to card to change styling */
    className?: string;
    /** Inline style objects passed to card wrapper */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default Card
     * */
    dataTestId?: string;
    /** Childrens passed to card wrapper */
    children: ReactNode;
}

export function Card({ className, style, dataTestId = 'Card', children, ...rest }: CardProps): JSX.Element {
    return (
        <div data-testid={dataTestId} className={classnames(styles.wrapper, className)} style={style} {...rest}>
            {children}
        </div>
    );
}
