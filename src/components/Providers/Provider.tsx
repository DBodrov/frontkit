import React from 'react';
import styles from './Provider.module.css';
import cn from 'classnames';

interface Props {
    src: string;
    name: string;
    dataTestId?: string;
    width?: string;
    style?: object;
    onClick?: () => unknown;
}
export function Provider({ src, name, dataTestId, width, style, onClick, ...rest }: Props) {
    return (
        <figure {...rest} className={styles.wrapper} data-testid={dataTestId} style={{ width, ...style }} onClick={onClick} role="button">
            <div className={styles.content}>
                <div data-testid={dataTestId + '-image'} className={cn(styles['image-wrapper'], styles['center-container'])}>
                    <img className={styles.image} src={src} alt={name} />
                </div>
                <div className={cn(styles['caption-wrapper'], styles['center-container'])}>
                    <figcaption className={styles.caption}>{name}</figcaption>
                </div>
            </div>
        </figure>
    );
}
