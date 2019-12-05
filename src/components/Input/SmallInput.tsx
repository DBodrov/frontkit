import React from 'react';
import styles from './SmallInput.module.css';
import { Props } from './types';
import { BaseInput } from './BaseInput';

export function SmallInput(props: Props): JSX.Element {
    return <BaseInput leftPartClassName={styles.left} rightPartClassName={styles.right} inputClassName={styles.input} {...props} />;
}
