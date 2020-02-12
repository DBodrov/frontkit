import { createStore, declareAction, declareAtom } from '@reatom/core';

type Key = string;

interface State {
    [key: string]: boolean;
}

export const initAction = declareAction<Key>();
export const toggleAction = declareAction<Key>();
export const accordionStateAtom = declareAtom<State>({}, on => [
    on(initAction, (state, key) => {
        return {
            ...state,
            [key]: false,
        };
    }),
    on(toggleAction, (state, key) => {
        return {
            ...state,
            [key]: !state[key],
        };
    }),
]);

export const accordionStore = createStore(accordionStateAtom);
