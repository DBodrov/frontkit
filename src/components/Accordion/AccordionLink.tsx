import { useGlobalState } from '../../reatom';
import { accordionStateAtom, accordionStore, initAction, toggleAction } from './accordionState';
import React from 'react';
import { LinkWrapper } from '../LinkWrapper';
import { Arrow, ArrowTypes } from '../Arrow';
import styles from './AccordionLink.module.css';

interface AccordionLinkProps {
    id: string;
    dataTestId?: string;
}

export function AccordionLink({ id, dataTestId = 'AccordionLink' }: AccordionLinkProps): JSX.Element {
    const state = useGlobalState(accordionStore, accordionStateAtom);
    const opened = state[id] || false;

    React.useEffect(() => {
        accordionStore.dispatch(initAction(id));
    }, [accordionStore, initAction]);

    const clickHandler = React.useCallback(() => {
        accordionStore.dispatch(toggleAction(id));
    }, [accordionStore, toggleAction]);

    return (
        <LinkWrapper onClick={clickHandler} className={styles.link} dataTestId={dataTestId}>
            <a data-testid={dataTestId + '-text'}>{opened ? 'Скрыть детали' : 'Показать детали'}</a>
            <Arrow
                dataTestId={dataTestId + '-arrow' + (opened ? '-down' : '-up')}
                className={styles.arrow}
                type={opened ? ArrowTypes.Up : ArrowTypes.Down}
            />
        </LinkWrapper>
    );
}
