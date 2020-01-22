import React from 'react';

export enum ArrowTypes {
    Right,
    Left,
    Up,
    Down,
}

const ArrowData = {
    [ArrowTypes.Left]: {
        d: 'M4.5 1L1 4.5L4.5 8',
        width: '6',
        height: '9',
        viewBox: '0 0 6 9',
    },
    [ArrowTypes.Right]: {
        d: 'M1 8L4.5 4.5L1 1',
        width: '6',
        height: '9',
        viewBox: '0 0 6 9',
    },
    [ArrowTypes.Up]: {
        d: 'M9 6L5 2L1 6',
        width: '9',
        height: '6',
        viewBox: '0 0 9 6',
    },
    [ArrowTypes.Down]: {
        d: 'M1 1L5 5L9 0.999999',
        width: '9',
        height: '6',
        viewBox: '0 0 9 6',
    },
};

export type IconProps = {
    dataTestId?: string;
    className?: string;
    color?: string;
    type: ArrowTypes;
};

export function Arrow({ dataTestId, className, color = '#A6AAB0', type }: IconProps) {
    return (
        <svg
            className={className}
            data-testid={dataTestId}
            width={ArrowData[type].width}
            height={ArrowData[type].height}
            viewBox={ArrowData[type].viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d={ArrowData[type].d} stroke={color} />
        </svg>
    );
}
