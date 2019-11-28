import * as React from 'react';
import styles from './Providers.module.css';
import { Provider } from './Provider';

type ProviderInfo = {
    id: string | number;
    src: string;
    name: string;
};
type Props = {
    dataTestId?: string;
    data: ReadonlyArray<ProviderInfo>;
    size: number;
    gap?: string;
};

function useOffset(max: number): [number, () => void, () => void] {
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => setOffset(0), [max]);

    const increase = React.useCallback(() => setOffset(o => Math.min(o + 1, max)), [setOffset, max]);
    const decrease = React.useCallback(() => setOffset(o => Math.max(o - 1, 0)), [setOffset]);

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

export function Providers({ data, size, gap = '0' }: Props): JSX.Element {
    const max = data.length - size;
    const [offset, increase, decrease] = useOffset(max);

    return (
        <div>
            <div className={styles.wrapper} style={createStyle(size, gap)}>
                {data.slice(offset, offset + size).map((provider, id, original) => (
                    <React.Fragment key={provider.id}>
                        <Provider name={provider.name} src={provider.src} width="100%" style={createChildStyleForIE(2 * (id + 1) - 1)} />
                        {id !== original.length - 1 && <div style={createChildStyleForIE(2 * (id + 1))} />}
                    </React.Fragment>
                ))}
            </div>
            <Scroller onClickLeft={offset === 0 ? undefined : decrease} onClickRight={offset === max ? undefined : increase} />
        </div>
    );
}

type ScrollerProps = { onClickLeft?: () => void; onClickRight?: () => void };
function Scroller({ onClickLeft, onClickRight }: ScrollerProps): JSX.Element {
    return (
        <div className={styles.scroller}>
            <button className={styles['scroller-button']} onClick={onClickLeft} disabled={!onClickLeft}>
                &lsaquo;
            </button>
            <button className={styles['scroller-button']} onClick={onClickRight} disabled={!onClickRight}>
                &rsaquo;
            </button>
        </div>
    );
}
