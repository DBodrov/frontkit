import React, { CSSProperties } from 'react';
import styles from './Provider.module.css';
import cn from 'classnames';
import TextClamp from 'react-string-clamp';

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
const IE11FigureFix: CSSProperties = { marginLeft: 0, marginRight: 0 };
export function Provider({ src, name, dataTestId, width, style, onClick, ...rest }: Props): JSX.Element {
    return (
        <figure
            {...rest}
            className={styles.wrapper}
            data-testid={dataTestId}
            style={{ width, ...style, ...IE11FigureFix }}
            onClick={onClick}
            role="button"
            title={name}
        >
            <div className={styles.content}>
                <div data-testid={dataTestId + '-image'} className={cn(styles['image-wrapper'], styles['center-container'])}>
                    <img className={styles.image} src={src} alt={name} />
                </div>
                <div className={cn(styles['caption-wrapper'], styles['center-container'])}>
                    <TextClamp lines={2} className={styles.caption} element="figcaption" text={name} />
                </div>
            </div>
        </figure>
    );
}
