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
    errorRender: (err: unknown, props: P) => JSX.Element;
    loadingRender: (props: P) => JSX.Element;
    props: P;
}
export function RenderPromise<T, P>({ promise, successRender, errorRender, loadingRender, props }: RenderPromiseProps<T, P>): JSX.Element {
    const [loadedData, setLoadedData] = React.useState<React.ComponentType | undefined>(undefined);
    React.useEffect(() => {
        promise
            ?.then(val => () => successRender(val, props))
            .catch(err => () => errorRender(err, props))
            .then(data => {
                // Потому что data - это функциональный компонент
                // Если выполнить setLoadedData(data), то setLoadedData посчитает data
                // функцией, которая изменяет стейт https://reactjs.org/docs/react-component.html#setstate
                setLoadedData(() => data);
            });
    }, [promise]);
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

function Error(err: unknown, props: Props): JSX.Element {
    return (
        <div className={styles.background} data-testid={props.dataTestId}>
            <div data-testid={props.dataTestId + '-errorText'} className={styles.errorText}>
                Произошла ошибка
            </div>
            <Button dataTestId={props.dataTestId + '-errorButton'} className={styles.errorButton}>
                Попробовать ещё раз
            </Button>
        </div>
    );
}

export function AccordionDetails({ id, getData, align = 'left', dataTestId = 'AccordionDetails' }: DetailsProps): JSX.Element {
    const state = useGlobalState(accordionStore, accordionStateAtom);
    const value = state[id] || false;
    const [data, setData] = React.useState<Promise<ReadonlyArray<Data>> | null>(null);

    React.useEffect(() => {
        accordionStore.dispatch(initAction(id));
    }, [accordionStore, initAction]);

    React.useEffect(() => {
        if (value && data === null) {
            setData(getData());
        }
    }, [data, value, setData, getData]);

    if (!value) {
        return <React.Fragment />;
    }

    return (
        <RenderPromise
            promise={data}
            successRender={AccordionDetailsSuccessWrapper}
            errorRender={Error}
            loadingRender={Loading}
            props={{
                dataTestId: dataTestId,
                align: align,
            }}
        />
    );
}
