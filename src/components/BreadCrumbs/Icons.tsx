import React from 'react';

export enum ArrowTypes {
    Right,
    Left,
}

const ArrowData = {
    [ArrowTypes.Left]: {
        d: 'M4.5 1L1 4.5L4.5 8',
    },
    [ArrowTypes.Right]: {
        d: 'M1 8L4.5 4.5L1 1',
    },
};

export type IconProps = {
    dataTestId?: string;
    className?: string;
    color?: string;
    type: ArrowTypes;
};

export function Arrow({ dataTestId = 'BreadCrumbs-arrow', className, color = '#A6AAB0', type }: IconProps) {
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
            <path d={ArrowData[type].d} stroke={color} />
        </svg>
    );
}
