import React from 'react';
import styles from './Input.module.css';
import { Props } from './types';
import { BaseInput } from './BaseInput';
import cn from 'classnames';

export function Input(props: Props): JSX.Element {
    return (
        <BaseInput
            {...props}
            leftPartClassName={styles.left}
            rightPartClassName={styles.right}
            inputClassName={cn(styles.input, props.inputClassName)}
        />
    );
}
