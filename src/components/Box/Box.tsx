import classnames from 'classnames';
import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './Box.module.css';

export enum SplitType {
    Full,
    Padding,
}

function defaultGetSplitType(splitOrder: number, size: number): SplitType {
    return SplitType.Full;
}

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
    /** Compute split type */
    getSplitType?: typeof defaultGetSplitType;
}

function getSplitClass(type: SplitType): string {
    return cn({
        [styles.paddingBorder]: type === SplitType.Padding,
    });
}

export function Box({
    className,
    getSplitType = defaultGetSplitType,
    style,
    dataTestId = 'Card',
    children,
    ...rest
}: CardProps): JSX.Element {
    return (
        <div data-testid={dataTestId} className={classnames(styles.wrapper, className)} style={style} {...rest}>
            {React.Children.toArray(children).map((child, index, origin) => (
                <React.Fragment key={index}>
                    {child}
                    {index !== origin.length - 1 && (
                        <div className={cn(styles.border, getSplitClass(getSplitType(index, origin.length - 1)))} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
