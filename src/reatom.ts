import { Atom, Store } from '@reatom/core';
import React from 'react';

export function useGlobalState<T>(store: Store, atom: Atom<T>): T {
    const [state, setState] = React.useState(() => store.getState(atom));
    React.useEffect(() => {
        return store.subscribe(atom, p => {
            setState(p);
        });
    }, [store, atom, setState]);
    return state;
}
