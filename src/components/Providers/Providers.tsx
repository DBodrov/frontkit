import cn from 'classnames';
import React, { CSSProperties } from 'react';
import { Arrow, ArrowTypes } from '../Arrow';
import { LinkWrapper } from '../LinkWrapper';
import { Provider } from './Provider';
import styles from './Providers.module.css';

type ProviderInfo = {
    id: string | number;
    src: string;
    name: string;
    addTextEnabled?: boolean;
    addText?: string;
    addTextBackgroundColor?: string;
};
interface Props {
    className?: string;
    style?: CSSProperties;
    dataTestId?: string;
    data: ReadonlyArray<ProviderInfo>;
    gap?: string;
    rows?: number;
    cols?: number;
    onClick?: (info: ProviderInfo) => unknown;
    HeadComponent?: JSX.Element;
    ButtonComponent?: JSX.Element;
    headClassName?: string;
    buttonLineClassName?: string;
    scrollerClassName?: string;
    providerButtonText?: string;
}

function useOffset(max: number): [number, (() => void) | undefined, (() => void) | undefined] {
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => setOffset(0), [max]);

    const increase = React.useCallback(() => setOffset(o => Math.min(o + 1, max)), [setOffset, max]);
    const decrease = React.useCallback(() => setOffset(o => Math.max(o - 1, 0)), [setOffset]);

    if (max <= 0) {
        return [0, undefined, undefined];
    }

    return [offset, increase, decrease];
}

function createLine(size: number, gap: string): string {
    let line = '1fr';
    for (let colId = 1; colId < size; colId++) {
        line += ` ${gap} 1fr`;
    }
    return line;
}
function createStyle(rows: number, cols: number, gap: string): object {
    const colsTemplate = createLine(cols, gap);
    const rowsTemplate = createLine(rows, gap);
    return {
        gridTemplateColumns: colsTemplate,
        gridTemplateRows: rowsTemplate,
        msGridColumns: colsTemplate,
        msGridRows: rowsTemplate,
    };
}

function createChildStyleForIE(col: number, row: number): object {
    return {
        msGridRow: row.toString(),
        msGridColumn: col.toString(),
    };
}

function getDataId(el: HTMLDivElement): string {
    const id = el.getAttribute('data-id');
    if (id !== null) {
        return id;
    }
    const dataIdTarget = el.closest('[data-id]');
    return dataIdTarget?.getAttribute('data-id') ?? '';
}

type OnProviderClick = (e: React.MouseEvent<HTMLDivElement>) => void;
interface ProvidersLineProps {
    data: Props['data'];
    dataTestId: string;
    offset: number;
    height: number;
    providerButtonText?: string;
}

function ProvidersLine({ data, dataTestId, offset, height, providerButtonText }: ProvidersLineProps): JSX.Element {
    return (
        <>
            {data.map((provider, id, original) => (
                <React.Fragment key={provider.id}>
                    <div style={createChildStyleForIE(2 * (id + 1) - 1, height + 1)}>
                        <Provider
                            name={provider.name}
                            src={provider.src}
                            dataTestId={`${dataTestId}-single-${provider.id}`}
                            data-id={offset + id}
                            addTextEnabled={provider.addTextEnabled}
                            addText={provider.addText}
                            addTextBackgroundColor={provider.addTextBackgroundColor}
                            providerButtonText={providerButtonText}
                        />
                    </div>
                    {id !== original.length - 1 && <div style={createChildStyleForIE(2 * (id + 1), height + 1)} />}
                </React.Fragment>
            ))}
        </>
    );
}

interface EmptyLineProps {
    row: number;
    cols: number;
}
function EmptyLine({ row, cols }: EmptyLineProps): JSX.Element {
    const res: Array<JSX.Element> = [];
    for (let id = 0; id < 2 * cols - 1; id++) {
        res.push(<div key={id} style={createChildStyleForIE(id + 1, row + 1)} />);
    }
    return <>{res}</>;
}

export function Providers({
    data,
    gap = '0',
    dataTestId = 'providers',
    onClick,
    rows = 1,
    cols = 1,
    HeadComponent,
    ButtonComponent,
    headClassName,
    buttonLineClassName,
    providerButtonText,
    scrollerClassName,
    ...rest
}: Props): JSX.Element {
    const size = rows * cols;
    const max = data.length - size;
    const [offset, increase, decrease] = useOffset(max);

    // заранее загружаем все изображения
    React.useEffect(() => {
        data.forEach(item => {
            const img = new Image();
            img.src = item.src;
        });
    }, [data]);

    const providerInfoIndex = React.useMemo(() => {
        const map = new Map<number, ProviderInfo>();
        for (let i = 0; i < data.length; ++i) {
            map.set(i, data[i]);
        }
        return map;
    }, [data]);

    const providerClickHandler: OnProviderClick = React.useCallback(
        e => {
            const target = e.target as HTMLDivElement;
            const idNumber = parseInt(getDataId(target), 10);
            const el = providerInfoIndex.get(idNumber);

            if (el !== undefined && onClick) {
                onClick(el);
            }
        },
        [onClick, providerInfoIndex],
    );

    const providersLines = React.useMemo(() => {
        const lines: Array<JSX.Element> = [];
        for (let rowId = 0; rowId < rows; ++rowId) {
            const start = rowId * cols + offset;
            const end = start + cols;
            lines.push(
                <ProvidersLine
                    key={`pl-${rowId}`}
                    data={data.slice(start, end)}
                    dataTestId={dataTestId}
                    offset={start}
                    height={2 * rowId}
                    providerButtonText={providerButtonText}
                />,
            );

            if (rowId !== rows - 1) {
                lines.push(<EmptyLine key={`el-${rowId}`} row={2 * rowId + 1} cols={cols} />);
            }
        }
        return lines;
    }, [offset, data, rows, cols]);

    const haveHeadComponent = HeadComponent !== undefined;
    const haveButtonComponent = ButtonComponent !== undefined;

    return (
        <div data-testid={dataTestId} {...rest}>
            <div className={headClassName}>
                {haveHeadComponent && haveButtonComponent && HeadComponent}
                <div className={buttonLineClassName}>
                    {haveHeadComponent && !haveButtonComponent && HeadComponent}
                    {haveButtonComponent && ButtonComponent}
                    {max > 0 && (
                        <Scroller
                            onClickLeft={offset === 0 ? undefined : decrease}
                            onClickRight={offset === max ? undefined : increase}
                            dataTestId={dataTestId + '-scroller'}
                            scrollerClassName={scrollerClassName}
                        />
                    )}
                </div>
            </div>
            <div onClick={providerClickHandler} className={styles.wrapper} style={createStyle(rows, cols, gap)}>
                {providersLines}
            </div>
        </div>
    );
}

type ScrollerProps = { onClickLeft?: () => void; onClickRight?: () => void; dataTestId: string; scrollerClassName?: string };
function Scroller({ onClickLeft, onClickRight, dataTestId, scrollerClassName }: ScrollerProps): JSX.Element {
    return (
        <LinkWrapper>
            <div className={cn(styles.scroller, scrollerClassName)}>
                <button
                    className={styles['scroller-button']}
                    onClick={onClickLeft}
                    disabled={!onClickLeft}
                    data-testid={dataTestId + '-decrease'}
                    type="button"
                >
                    <Arrow type={ArrowTypes.Left} color={!onClickLeft ? '#D5DAE0' : ''} />
                </button>
                <div className={styles.del} />
                <button
                    className={styles['scroller-button']}
                    onClick={onClickRight}
                    disabled={!onClickRight}
                    data-testid={dataTestId + '-increase'}
                    type="button"
                >
                    <Arrow type={ArrowTypes.Right} color={!onClickRight ? '#D5DAE0' : ''} />
                </button>
            </div>
        </LinkWrapper>
    );
}
