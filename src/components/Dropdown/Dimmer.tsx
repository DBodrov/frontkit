import React from 'react';
import ReactDom from 'react-dom';
import styles from './Dimmer.module.css';

export function Dimmer(): JSX.Element {
    return ReactDom.createPortal(<div className={styles.dimmer} />, document.body);
}
