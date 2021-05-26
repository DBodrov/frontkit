import React from 'react';
import { Button, StyleTypeProp } from '../Button';
import styles from './Provider.module.css';
import cn from 'classnames';
import ColorHash from 'color-hash';
// @ts-ignore
import TextClamp from 'react-string-clamp';

interface Props {
    src: string;
    name: string;
    dataTestId?: string;
    width?: string;
    style?: object;
    addTextEnabled?: boolean;
    addText?: string;
    addTextBackgroundColor?: string;
    onClick?: () => unknown;
    providerButtonText?: string;
}
const DefaultImgUrl = 'https://www.a-3.ru/img/logo_png/home-icon.png';
const defaultAddTextBgColor = '#fa5535';
const defaultAddText = 'Комиссия 0%';
// В IE11 для figure установлены margin-ы по умолчанию, которые ломают вёрстку.
// Сбросить их можно исключительно inline стилями
const IE11FigureFix: React.CSSProperties = { marginLeft: 0, marginRight: 0 };
export function Provider({
    src,
    name,
    dataTestId,
    width = '100%',
    style,
    onClick,
    addTextEnabled,
    addText,
    addTextBackgroundColor,
    providerButtonText,
    ...rest
}: Props): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <figure
                {...rest}
                className={cn(styles.figure, { [styles.buttonFigure]: providerButtonText })}
                data-testid={dataTestId}
                style={{ width, ...style, ...IE11FigureFix }}
                onClick={onClick}
                role="button"
                title={name}
            >
                {addTextEnabled && (
                    <div
                        className={styles.addText}
                        style={{ background: addTextBackgroundColor || defaultAddTextBgColor }}
                        data-testid={dataTestId + '-addText'}
                    >
                        {addText || defaultAddText}
                    </div>
                )}
                {src !== DefaultImgUrl && <img data-testid={dataTestId + '-image'} className={styles.image} src={src} alt={name} />}
                {src === DefaultImgUrl && <DefaultProviderPic name={name} dataTestId={dataTestId + 'image'} />}
                <TextClamp className={styles.caption} text={name} lines={3} />
            </figure>
            {providerButtonText && (
                <Button
                    {...rest}
                    dataTestId={dataTestId + '-providerButton'}
                    type="button"
                    styleType={StyleTypeProp.WhiteBodyWithBorder}
                    className={styles.button}
                >
                    {providerButtonText}
                </Button>
            )}
        </div>
    );
}

const colorHash = new ColorHash({
    lightness: 0.5,
    saturation: 0.4,
});

function DefaultProviderPic({ name, dataTestId }: { name: string; dataTestId: string }): JSX.Element {
    return (
        <div data-testid={dataTestId} className={styles.image} title={name}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100%"
                width="60%"
                fill={colorHash.hex(
                    `${name[name.length - 1]}
               ${name.length}
               ${name}`,
                )}
                viewBox="0 0 92 64"
            >
                <title>{name}</title>
                <path
                    id="figure"
                    className="cls-1"
                    d="M84,64V62H69v2H61V58H46v6H38V60H23v4H15V62H0V60H15V54H0V52H15V46H0V44H15V38H0V36H15V30H0V28H15l8,8v6H38V36H23V34H38V28H23V26H38V20H23V18H38V12H23V10H38l8,8v6H61V18H46V16H61V10H46V8H61V2H46V0H61l8,8V20H84l8,8V64H84ZM38,44H23v6H38V44Zm0,8H23v6H38V52ZM61,26H46v6H61V26Zm0,8H46v6H61V34Zm0,8H46v6H61V42Zm0,8H46v6H61V50ZM84,22H69v6H84V22Zm0,8H69v6H84V30Zm0,8H69v6H84V38Zm0,8H69v6H84V46Zm0,8H69v6H84V54Z"
                />
            </svg>
        </div>
    );
}
