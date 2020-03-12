import React from 'react';
import styles from './Provider.module.css';

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
const IE11FigureFix: React.CSSProperties = { marginLeft: 0, marginRight: 0 };
export function Provider({ src, name, dataTestId, width = '100%', style, onClick, ...rest }: Props): JSX.Element {
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
            <img data-testid={dataTestId + '-image'} className={styles.image} src={src} alt={name} />
            <figcaption className={styles.caption}>{name}</figcaption>
        </figure>
    );
}
