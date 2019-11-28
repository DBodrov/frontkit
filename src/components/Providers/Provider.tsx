import * as React from 'react';
import styles from './Provider.module.css';
import cn from 'classnames';

type Props = {
    src: string;
    name: string;
    dataTestId?: string;
    width?: string;
    style?: object;
};
export function Provider({ src, name, dataTestId, width, style }: Props) {
    return (
        <figure className={styles.wrapper} data-testid={dataTestId} style={{ width, ...style }}>
            <div className={styles.content}>
                <div className={cn(styles['image-wrapper'], styles['center-container'])}>
                    <img className={styles.image} src={src} alt={name} />
                </div>
                <div className={cn(styles['caption-wrapper'], styles['center-container'])}>
                    <figcaption className={styles.caption}>{name}</figcaption>
                </div>
            </div>
        </figure>
    );
}
