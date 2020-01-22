export const getKeyCode = function(event: KeyboardEvent & { keyIdentifier: string }): number | string {
    switch (true) {
        case event.key !== undefined:
            return event.key;
        case event.keyIdentifier !== undefined:
            return event.keyIdentifier;
        default:
            return event.keyCode;
    }
};

export function subscribeEvent(condition: boolean, eventName: string, handler: (e: Event) => void): (() => void) | void {
    if (condition) {
        document.addEventListener(eventName, handler);
        return () => {
            document.removeEventListener(eventName, handler);
        };
    }
}
