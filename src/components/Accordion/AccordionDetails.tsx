import React from 'react';
import { useGlobalState } from '../../reatom';
import { accordionStateAtom, accordionStore, initAction } from './accordionState';
import { AccordionDetailsSuccess, Data } from './AccordionDetailsSuccess';
import styles from './AccordionDetails.module.css';
import { Spinner } from '../Spinner';
import { Button } from '../Button';

interface DetailsProps {
    id: string;
    getData: () => Promise<ReadonlyArray<Data>>;
    align?: 'left' | 'right';
    dataTestId?: string;
}

interface RenderPromiseProps<T, P> {
    promise: Promise<T> | null;
    successRender: (val: T, props: P) => JSX.Element;
    errorRender: (err: unknown, props: P, reset: () => unknown) => JSX.Element;
    loadingRender: (props: P) => JSX.Element;
    reset: () => unknown;
    props: P;
}
export function RenderPromise<T, P>({
    promise,
    reset,
    successRender,
    errorRender,
    loadingRender,
    props,
}: RenderPromiseProps<T, P>): JSX.Element {
    const [loadedData, setLoadedData] = React.useState<React.ComponentType | null>(null);

    React.useEffect(() => {
        if (promise !== null) {
            setLoadedData(null);
        }
    }, [promise]);

    React.useEffect(() => {
        if (loadedData === null) {
            promise
                ?.then(val => () => successRender(val, props))
                .catch(err => () => errorRender(err, props, reset))
                .then(data => {
                    // Потому что data - это функциональный компонент
                    // Если выполнить setLoadedData(data), то setLoadedData посчитает data
                    // функцией, которая изменяет стейт https://reactjs.org/docs/react-component.html#setstate
                    setLoadedData(() => data);
                });
        }
    }, [promise, setLoadedData, loadedData]);

    if (promise === null) {
        return <React.Fragment />;
    }

    return React.createElement(loadedData ?? (() => loadingRender(props)));
}

type Props = Omit<React.ComponentProps<typeof AccordionDetailsSuccess>, 'data'>;
const AccordionDetailsSuccessWrapper = (val: ReadonlyArray<Data>, props: Props) => <AccordionDetailsSuccess data={val} {...props} />;

function Loading(props: Props): JSX.Element {
    return (
        <div className={styles.background} data-testid={props.dataTestId}>
            <Spinner />
        </div>
    );
}

function Error(err: unknown, props: Props, reset: () => unknown): JSX.Element {
    return (
        <div className={styles.background} data-testid={props.dataTestId}>
            <div data-testid={props.dataTestId + '-errorText'} className={styles.errorText}>
                Произошла ошибка
            </div>
            <Button dataTestId={props.dataTestId + '-errorButton'} onClick={reset} className={styles.errorButton}>
                Попробовать ещё раз
            </Button>
        </div>
    );
}

function lazyFactory<T>(factory: () => Promise<T>): () => Promise<T> {
    let resolve: (arg: T) => void;
    let reject: (arg: unknown) => void;
    const cache = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    let called = false;

    return () => {
        if (!called) {
            factory()
                .then(resolve)
                .catch(reject);
            called = true;
        }
        return cache;
    };
}

interface LazyResult<T> {
    lazy: () => Promise<T>;
    reset: () => unknown;
}
export function lazy<T>(factory: () => Promise<T>): LazyResult<T> {
    let instance = lazyFactory(factory);
    function reset(): void {
        instance = lazyFactory(factory);
    }
    return {
        lazy: (): Promise<T> =>
            instance().catch(e => {
                reset();
                return Promise.reject(e);
            }),
        reset,
    };
}

export function AccordionDetails({ id, getData, align = 'left', dataTestId = 'AccordionDetails' }: DetailsProps): JSX.Element {
    const state = useGlobalState(accordionStore, accordionStateAtom);
    const opened = state[id] || false;
    const [data, setData] = React.useState<Promise<ReadonlyArray<Data>> | null>(null);

    const getDataMemo = React.useMemo(() => lazy(getData).lazy, [getData]);

    React.useEffect(() => {
        accordionStore.dispatch(initAction(id));
    }, [accordionStore, initAction]);

    const reset = React.useCallback(() => {
        setData(() => getDataMemo());
    }, [setData, getData]);

    React.useEffect(() => {
        if (opened && data === null) {
            reset();
        }
    }, [data, opened, reset]);

    React.useEffect(() => {
        if (!opened) {
            setData(null);
        }
    }, [opened]);

    if (!opened) {
        return <React.Fragment />;
    }

    return (
        <RenderPromise
            promise={data}
            successRender={AccordionDetailsSuccessWrapper}
            errorRender={Error}
            loadingRender={Loading}
            reset={reset}
            props={{
                dataTestId: dataTestId,
                align: align,
            }}
        />
    );
}
