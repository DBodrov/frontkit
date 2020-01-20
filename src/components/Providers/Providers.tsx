import React from 'react';
import styles from './Providers.module.css';
import { Provider } from './Provider';

type ProviderInfo = {
    id: string | number;
    src: string;
    name: string;
};
interface Props {
    dataTestId?: string;
    data: ReadonlyArray<ProviderInfo>;
    size: number;
    gap?: string;
    onClick?: (info: ProviderInfo) => unknown;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

function useOffset(max: number): [number, () => void, () => void] {
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => setOffset(0), [max]);

    const increase = React.useCallback(() => setOffset(o => Math.min(o + 1, max)), [setOffset, max]);
    const decrease = React.useCallback(() => setOffset(o => Math.max(o - 1, 0)), [setOffset]);

    if (max <= 0) {
        return [0, noop, noop];
    }

    return [offset, increase, decrease];
}

function createColumns(size: number, gap: string): string {
    let res = '1fr';
    for (let i = 1; i < size; ++i) {
        res += ` ${gap} 1fr`;
    }
    return res;
}
function createStyle(size: number, gap: string): object {
    const columns = createColumns(size, gap);
    return {
        gridTemplateColumns: columns,
        msGridColumns: columns,
    };
}

function createChildStyleForIE(order: number): object {
    return {
        msGridRow: '1',
        msGridColumn: order.toString(),
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

export function Providers({ data, size, gap = '0', dataTestId = 'providers', onClick }: Props): JSX.Element {
    const max = data.length - size;
    const [offset, increase, decrease] = useOffset(max);

    const providerInfoIndex = React.useMemo(() => {
        const map = new Map<number, ProviderInfo>();
        for (let i = 0; i < data.length; ++i) {
            map.set(i, data[i]);
        }
        return map;
    }, [data]);

    const providerClickHandler = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const target = e.target as HTMLDivElement;
            const idNumber = parseInt(getDataId(target), 10);
            const el = providerInfoIndex.get(idNumber);

            if (el !== undefined && onClick) {
                onClick(el);
            }
        },
        [onClick, providerInfoIndex],
    );

    return (
        <div data-testid={dataTestId}>
            <div onClick={providerClickHandler} className={styles.wrapper} style={createStyle(size, gap)}>
                {data.slice(offset, offset + size).map((provider, id, original) => (
                    <React.Fragment key={provider.id}>
                        <Provider
                            name={provider.name}
                            src={provider.src}
                            width="100%"
                            style={createChildStyleForIE(2 * (id + 1) - 1)}
                            dataTestId={`${dataTestId}-single-${provider.id}`}
                            data-id={offset + id}
                        />
                        {id !== original.length - 1 && <div style={createChildStyleForIE(2 * (id + 1))} />}
                    </React.Fragment>
                ))}
            </div>
            {max > 0 && (
                <Scroller
                    onClickLeft={offset === 0 ? undefined : decrease}
                    onClickRight={offset === max ? undefined : increase}
                    dataTestId={dataTestId + '-scroller'}
                />
            )}
        </div>
    );
}

type ScrollerProps = { onClickLeft?: () => void; onClickRight?: () => void; dataTestId: string };
function Scroller({ onClickLeft, onClickRight, dataTestId }: ScrollerProps): JSX.Element {
    return (
        <div className={styles.scroller}>
            <button
                className={styles['scroller-button']}
                onClick={onClickLeft}
                disabled={!onClickLeft}
                data-testid={dataTestId + '-decrease'}
            >
                &lsaquo;
            </button>
            <button
                className={styles['scroller-button']}
                onClick={onClickRight}
                disabled={!onClickRight}
                data-testid={dataTestId + '-increase'}
            >
                &rsaquo;
            </button>
        </div>
    );
}
