import React from 'react';
import { useGlobalState } from '../../reatom';
import { accordionStateAtom, accordionStore, initAction } from './accordionState';
import { AccordionDetailsSuccess, Data } from './AccordionDetailsSuccess';
import styles from './AccordionDetails.module.css';
import { Spinner } from '../Spinner';
import { Button } from '../Button';
import { lazy, RenderPromise } from './utils';
import { useInsideBox, offsetMargin } from '../Box';
import cn from 'classnames';

interface DetailsProps {
    id: string;
    getData: () => Promise<ReadonlyArray<Data>>;
    align?: 'left' | 'right';
    dataTestId?: string;
}

type Props = Omit<React.ComponentProps<typeof AccordionDetailsSuccess>, 'data'>;
const AccordionDetailsSuccessWrapper = (val: ReadonlyArray<Data>, props: Props) => <AccordionDetailsSuccess data={val} {...props} />;

function Loading(props: Props): JSX.Element {
    const insideBox = useInsideBox();
    return (
        <div className={cn(styles.background, { [offsetMargin]: insideBox })} data-testid={props.dataTestId}>
            <Spinner />
        </div>
    );
}

function Error(err: unknown, props: Props, reset: () => unknown): JSX.Element {
    const insideBox = useInsideBox();
    return (
        <div className={cn(styles.background, { [offsetMargin]: insideBox })} data-testid={props.dataTestId}>
            <div data-testid={props.dataTestId + '-errorText'} className={styles.errorText}>
                Произошла ошибка
            </div>
            <Button dataTestId={props.dataTestId + '-errorButton'} onClick={reset} className={styles.errorButton}>
                Попробовать ещё раз
            </Button>
        </div>
    );
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
