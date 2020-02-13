import React from 'react';

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
