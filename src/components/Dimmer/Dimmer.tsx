import React from 'react';
import ReactDom from 'react-dom';
import styles from './Dimmer.module.css';

export function Dimmer({ dataTestId, clickOutSide }: { dataTestId: string; clickOutSide?: () => void }): JSX.Element {
    return ReactDom.createPortal(<div className={styles.dimmer} onClick={clickOutSide} data-testid={dataTestId} />, document.body);
}
