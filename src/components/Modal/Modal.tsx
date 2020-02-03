import * as React from 'react';
import { Dimmer } from '../Dimmer';
import { H3 } from '../Header';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import cn from 'classnames';

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
    onClose?: (event?: React.MouseEvent<HTMLDivElement>) => void;
    children: JSX.Element;
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
    header?: string;
    dataTestId?: string;
}

const EscapeCode = 27;

function changeBodyStyles() {
    const oldOverflow = document.body.style.overflow;
    const oldHeight = document.body.style.height;
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    return () => {
        document.body.style.overflow = oldOverflow;
        document.body.style.height = oldHeight;
    };
}

export function subscribeEvent(condition: boolean, eventName: string, handler: EventListenerOrEventListenerObject) {
    if (condition) {
        document.addEventListener(eventName, handler);
        return () => {
            document.removeEventListener(eventName, handler);
        };
    }
}

const Popup = ({ children, onClose, closeOnClickOutside = true, closeOnEsc = true, header, dataTestId = 'Modal', ...rest }: PopupProps) => {
    const wrapperRef = React.useRef(null);

    React.useEffect(changeBodyStyles, []);
    React.useEffect(() => {
        function closeByClickOutside(e: Event) {
            if (e.target === wrapperRef.current && onClose) {
                onClose();
            }
        }

        return subscribeEvent(closeOnClickOutside, 'mousedown', closeByClickOutside);
    }, [onClose]);
    React.useEffect(() => {
        function closeByEscHandler(e: any) {
            if (e.keyCode === EscapeCode && onClose) {
                onClose();
            }
        }

        return subscribeEvent(closeOnEsc, 'keydown', closeByEscHandler);
    }, [onClose]);

    return (
        <>
            <Dimmer dataTestId={dataTestId + '-Dimmer'} />
            <div ref={wrapperRef} className={styles.wrapper} data-testid={dataTestId + '-Wrapper'}>
                <div {...rest} className={cn(styles.middle, rest.className)}>
                    <div data-testid={dataTestId} className={styles.popup}>
                        {Boolean(header) && <H3 className={styles.header}>{header}</H3>}
                        {onClose && (
                            <div onClick={onClose}>
                                <div className={styles.close} data-testid={dataTestId + '-Close'} />
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export function Modal(props: PopupProps): React.ReactPortal {
    return createPortal(<Popup {...props} />, document.body);
}
