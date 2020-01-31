import React, { ReactNode, CSSProperties } from 'react';
import cn from 'classnames';
import styles from './Box.module.css';

export enum SplitType {
    Full,
    Padding,
    OnlyLastFull,
}

const SplitFunctions = {
    [SplitType.Full]: (): SplitType => SplitType.Full,
    [SplitType.Padding]: (): SplitType => SplitType.Padding,
    [SplitType.OnlyLastFull]: (index: number, size: number): SplitType => (size - 1 === index ? SplitType.Full : SplitType.Padding),
};

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to box to change styling */
    className?: string;
    /** Inline style objects passed to box wrapper */
    style?: CSSProperties;
    /** ID attribute for QA Auto-tests
     * @default Box
     * */
    dataTestId?: string;
    /** Childrens passed to box wrapper */
    children: ReactNode;
    /** Compute split type */
    getSplitType?: SplitType;
}

function getSplitClass(type: SplitType): string {
    return cn({
        [styles.paddingBorder]: type === SplitType.Padding,
    });
}

export function Box({ className, getSplitType = SplitType.Full, style, dataTestId = 'Card', children, ...rest }: BoxProps): JSX.Element {
    return (
        <div
            data-testid={dataTestId}
            className={cn(
                styles.wrapper,
                {
                    [styles.w_full]: getSplitType === SplitType.Full,
                    [styles.w_padding]: getSplitType === SplitType.Padding,
                    [styles.w_last_full]: getSplitType === SplitType.OnlyLastFull,
                },
                className,
            )}
            style={style}
            {...rest}
        >
            {React.Children.toArray(children).map((child, index, origin) => (
                <React.Fragment key={index}>
                    {child}
                    {index !== origin.length - 1 && (
                        <div className={cn(styles.border, getSplitClass(SplitFunctions[getSplitType](index, origin.length - 1)))} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
