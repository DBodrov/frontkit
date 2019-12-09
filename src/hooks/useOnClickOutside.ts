import { useEffect, RefObject, DependencyList, EffectCallback } from 'react';

export function useOnClickOutside(ref: RefObject<HTMLElement | null>, f: EffectCallback, deps: DependencyList): void {
    useEffect(() => {
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
    }, [deps, ref, f]);
}
