import React from 'react';
import ReactDom from 'react-dom';
import styles from './Dimmer.module.css';

export function Dimmer({ dataTestId }: { dataTestId: string }): JSX.Element {
    return ReactDom.createPortal(<div className={styles.dimmer} data-testid={dataTestId} />, document.body);
}
