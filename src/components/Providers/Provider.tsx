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
// В IE11 для figure установлены margin-ы по умолчанию, которые ломают вёрстку.
// Сбросить их можно исключительно inline стилями
const IE11FigureFix = { marginLeft: 0 };
export function Provider({ src, name, dataTestId, width, style, onClick, ...rest }: Props): JSX.Element {
    return (
        <figure
            {...rest}
            className={styles.wrapper}
            data-testid={dataTestId}
            style={{ width, ...style, ...IE11FigureFix }}
            onClick={onClick}
            role="button"
        >
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
