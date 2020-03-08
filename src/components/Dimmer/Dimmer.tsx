import React from 'react';
import ReactDom from 'react-dom';
import styles from './Dimmer.module.css';

export function Dimmer({
    dataTestId,
    clickOutSide,
    zIndex = 50,
}: {
    dataTestId: string;
    clickOutSide?: () => void;
    zIndex?: number;
}): JSX.Element {
    return ReactDom.createPortal(
        <div className={styles.dimmer} style={{ zIndex }} onClick={clickOutSide} data-testid={dataTestId} />,
        document.body,
    );
}
