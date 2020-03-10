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
enum Mode {
    None,
    Square,
    Rectangle,
}
// В IE11 для figure установлены margin-ы по умолчанию, которые ломают вёрстку.
// Сбросить их можно исключительно inline стилями
const IE11FigureFix: React.CSSProperties = { marginLeft: 0, marginRight: 0 };
export function Provider({ src, name, dataTestId, width = '100%', style, onClick, ...rest }: Props): JSX.Element {
    const [mode, setMode] = React.useState<Mode>(Mode.None);
    const [computedWidth, setComputedWidth] = React.useState(0);
    const figureRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const current = figureRef.current;
        if (!current) {
            return;
        }
        setMode(current.offsetHeight > current.offsetWidth ? Mode.Rectangle : Mode.Square);
        setComputedWidth(current.offsetWidth);
    }, []);
    let heightStyles: React.CSSProperties = {};
    switch (mode) {
        case Mode.None:
            heightStyles = { visibility: 'hidden' };
            break;
        case Mode.Square:
            heightStyles = { height: computedWidth + 'px' };
            break;
        case Mode.Rectangle:
            heightStyles = {};
            break;
    }
    return (
        <figure
            ref={figureRef}
            {...rest}
            className={styles.wrapper}
            data-testid={dataTestId}
            style={{ width, ...style, ...heightStyles, ...IE11FigureFix }}
            onClick={onClick}
            role="button"
            title={name}
        >
            <img data-testid={dataTestId + '-image'} className={styles.image} src={src} alt={name} />
            <figcaption className={styles.caption}>{name}</figcaption>
        </figure>
    );
}
