import React from 'react';
import { IconProps } from './Icons';
import { BackgroundProp } from './BaseInput';

export interface Props extends React.AllHTMLAttributes<HTMLInputElement> {
    value?: string;
    RightIcon?: React.ComponentType<IconProps>;
    LeftIcon?: React.ComponentType<IconProps>;
    background?: BackgroundProp;
    dataTestId?: string;
    right?: boolean;
    showOutline?: boolean;
    autoFocus?: boolean;
    leftPartClassName?: string;
    rightPartClassName?: string;
    inputClassName?: string;
    disableLeftBorderRadius?: boolean;
    disableRightBorderRadius?: boolean;
}
