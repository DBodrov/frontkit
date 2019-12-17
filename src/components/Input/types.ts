import React from 'react';
import { IconProps } from './Icons';
import { BackgroundProp } from './BaseInput';

export type Props = {
    value?: string;
    RightIcon?: React.ComponentType<IconProps>;
    LeftIcon?: React.ComponentType<IconProps>;
    background?: BackgroundProp;
    dataTestId?: string;
    right?: boolean;
} & React.AllHTMLAttributes<HTMLInputElement>;
