import React from 'react';
import styles from './Input.module.css';
import { Props } from './types';
import { BaseInput } from './BaseInput';

export function Input(props: Props): JSX.Element {
    return <BaseInput leftPartClassName={styles.left} rightPartClassName={styles.right} inputClassName={styles.input} {...props} />;
}
