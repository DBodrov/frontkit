import React from 'react';

export function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, f: React.EffectCallback, deps: React.DependencyList): void {
    React.useEffect(() => {
        function clickHandler(e: MouseEvent): void {
            const { current } = ref;
            if (!current) {
                return;
            }

            if (!current.contains(e.target as Node)) {
                f();
            }
        }

        document.addEventListener('click', clickHandler);
        return (): void => document.removeEventListener('click', clickHandler);
    }, deps);
}
