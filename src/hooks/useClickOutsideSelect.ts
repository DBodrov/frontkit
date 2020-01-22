import React from 'react';
import { subscribeEvent } from '../constants/events';

export function useClickOutside(wrapperRef: React.RefObject<HTMLDivElement>, onClick: () => void): void {
    React.useEffect(() => {
        function closeByClickOutside(e: any): void {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && onClick) {
                onClick();
            }
        }

        return subscribeEvent(true, 'mousedown', closeByClickOutside);
    }, [wrapperRef, onClick]);
}
