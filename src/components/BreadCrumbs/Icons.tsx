import React from 'react';

export type IconProps = {
    dataTestId?: string;
    className?: string;
    color?: string;
};

export function LeftArrow({ dataTestId = 'BreadCrumbs-left-icon', className, color }: IconProps) {
    return (
        <svg
            className={className}
            data-testid={dataTestId}
            width="5"
            height="9"
            viewBox="0 0 5 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4.5 1L1 4.5L4.5 8" stroke={color} />
        </svg>
    );
}

export function RightArrow({ dataTestId = 'BreadCrumbs-left-icon', className }: IconProps) {
    return (
        <svg
            className={className}
            data-testid={dataTestId}
            width="6"
            height="9"
            viewBox="0 0 6 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M1 8L4.5 4.5L1 1" stroke="#A6AAB0" />
        </svg>
    );
}
