import React from 'react';
import styles from './Icons.module.css';

export type IconProps = {
    dataTestId?: string;
};
export function ErrorIcon({ dataTestId = 'input-error-icon' }: IconProps): JSX.Element {
    return (
        <svg data-testid={dataTestId} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="6" stroke="#F44444" strokeWidth="3" />
            <line x1="2.93934" y1="11.9393" x2="11.9393" y2="2.93934" stroke="#F44444" strokeWidth="3" />
        </svg>
    );
}

export function SuccessIcon({ dataTestId = 'input-success-icon' }: IconProps): JSX.Element {
    return (
        <svg data-testid={dataTestId} width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4.72222L6.17241 9L13 2" stroke="#15D747" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function ArrowIcon({ dataTestId = 'input-arrow-icon' }: IconProps): JSX.Element {
    return (
        <svg data-testid={dataTestId} width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4.72222L6.17241 9L13 2" stroke="#15D747" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function SearchIcon({ dataTestId = 'input-search-icon' }: IconProps): JSX.Element {
    return (
        <svg data-testid={dataTestId} width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5.25" stroke="#7E8996" strokeWidth="1.5" />
            <line x1="9.53033" y1="9.46967" x2="15.5303" y2="15.4697" stroke="#7E8996" strokeWidth="1.5" />
        </svg>
    );
}

const head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
const addStyle = (css: string) => style.appendChild(document.createTextNode(css));

function stopPropagation(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    e.stopPropagation();
}
export type HelpIconProps = {
    text: string | JSX.Element;
} & IconProps;
export function HelpIcon({ dataTestId = 'input-search-icon', text }: HelpIconProps): JSX.Element {
    const [isOpen, setIsOpen] = React.useState(false);
    const element = React.useRef<HTMLDivElement>(null);
    const onMouseLeave = React.useCallback(() => setIsOpen(false), [setIsOpen]);
    const onMouseEnter = React.useCallback(() => setIsOpen(true), [setIsOpen]);
    return (
        <div
            className={styles.wrapper}
            data-testid={dataTestId}
            onClick={stopPropagation}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            ref={element}
        >
            <svg
                role="button"
                className={styles.icon}
                data-testid={dataTestId + '-icon'}
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="10.5" cy="10.5" r="10.5" fill="#C6CED9" />
                <path
                    d="M8.456 7.134C8.588 7.014 8.732 6.902 8.888 6.798C9.044 6.694 9.212 6.602 9.392 6.522C9.576 6.442 9.774 6.38 9.986 6.336C10.202 6.288 10.434 6.264 10.682 6.264C11.014 6.264 11.318 6.312 11.594 6.408C11.874 6.5 12.114 6.634 12.314 6.81C12.518 6.982 12.676 7.192 12.788 7.44C12.9 7.684 12.956 7.958 12.956 8.262C12.956 8.566 12.912 8.83 12.824 9.054C12.736 9.274 12.624 9.466 12.488 9.63C12.352 9.794 12.204 9.938 12.044 10.062C11.884 10.182 11.732 10.296 11.588 10.404C11.448 10.508 11.326 10.614 11.222 10.722C11.122 10.826 11.062 10.942 11.042 11.07L10.916 11.97H10.04L9.95 10.98C9.93 10.792 9.96 10.63 10.04 10.494C10.12 10.358 10.226 10.23 10.358 10.11C10.494 9.99 10.642 9.876 10.802 9.768C10.966 9.656 11.118 9.532 11.258 9.396C11.398 9.26 11.516 9.108 11.612 8.94C11.708 8.772 11.756 8.57 11.756 8.334C11.756 8.178 11.726 8.038 11.666 7.914C11.606 7.786 11.522 7.678 11.414 7.59C11.306 7.502 11.18 7.434 11.036 7.386C10.892 7.338 10.736 7.314 10.568 7.314C10.332 7.314 10.132 7.342 9.968 7.398C9.804 7.454 9.664 7.516 9.548 7.584C9.432 7.648 9.336 7.708 9.26 7.764C9.184 7.816 9.12 7.842 9.068 7.842C8.944 7.842 8.852 7.788 8.792 7.68L8.456 7.134ZM9.608 14.256C9.608 14.14 9.628 14.032 9.668 13.932C9.712 13.828 9.77 13.738 9.842 13.662C9.918 13.586 10.006 13.526 10.106 13.482C10.21 13.438 10.32 13.416 10.436 13.416C10.552 13.416 10.66 13.438 10.76 13.482C10.864 13.526 10.954 13.586 11.03 13.662C11.106 13.738 11.166 13.828 11.21 13.932C11.254 14.032 11.276 14.14 11.276 14.256C11.276 14.376 11.254 14.486 11.21 14.586C11.166 14.686 11.106 14.774 11.03 14.85C10.954 14.926 10.864 14.984 10.76 15.024C10.66 15.068 10.552 15.09 10.436 15.09C10.32 15.09 10.21 15.068 10.106 15.024C10.006 14.984 9.918 14.926 9.842 14.85C9.77 14.774 9.712 14.686 9.668 14.586C9.628 14.486 9.608 14.376 9.608 14.256Z"
                    fill="#8C929C"
                />
            </svg>
            {isOpen && <Tooltip text={text} dataTestId={dataTestId} parent={element} />}
        </div>
    );
}

const Tooltip = ({
    text,
    dataTestId,
    parent,
}: {
    text: string | JSX.Element;
    dataTestId?: string;
    parent: React.RefObject<HTMLDivElement>;
}) => {
    const tooltip = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const parentElem = parent.current;
        const tooltipElem = tooltip.current;

        const coords = parentElem?.getBoundingClientRect();
        if (!coords || !parentElem || !tooltipElem || tooltipElem.offsetWidth === 0) return;

        let right: number;
        let left = 0;
        let top = 0;
        tooltipElem.style.left = left.toString();
        tooltipElem.style.top = top.toString();
        tooltipElem.style.position = 'fixed';

        const diff = Math.abs(parentElem.offsetWidth - tooltipElem.offsetWidth) / 2;
        right = coords.right + diff;
        left = coords.left - diff;
        if (right > window.innerWidth) {
            // Надо двигать справа
            right = -10;
            left = 0;
        } else if (left < 0) {
            // Надо двигать слева
            const indent = (window.innerWidth - tooltipElem.offsetWidth) / 2;
            left = (indent > 30 ? 30 : indent) - coords.left;
            right = 0;
        } else {
            // Центрируем
            left = -diff;
            right = 0;
        }

        top = coords.top - tooltipElem.offsetHeight - 15;
        const beforeLeft =
            left !== 0 ? Math.abs(left) + parentElem.offsetWidth / 2 - 9 : tooltipElem.offsetWidth + right - parentElem.offsetWidth / 2 - 7;
        if (top < 0) {
            // если подсказка не помещается сверху, то отображать её снизу
            addStyle(`.${styles.tooltip}:before {left: ${beforeLeft}px; top: -9px; border-bottom: 9px solid #fff; border-top: 0;}`);
            top = parentElem.offsetHeight + 10;
        } else {
            addStyle(
                `.${styles.tooltip}:before {left: ${beforeLeft}px; top: ${tooltipElem.offsetHeight -
                    1}px; border-top: 9px solid #fff; border-bottom: 0;}`,
            );
            top = -(tooltipElem.offsetHeight + 10);
        }
        tooltipElem.style.minWidth = tooltipElem.offsetWidth + 1 + 'px';
        tooltipElem.style.right = right ? right + 'px' : '';
        tooltipElem.style.left = left ? left + 'px' : '';
        tooltipElem.style.top = top ? top + 'px' : '';
        tooltipElem.style.position = 'absolute';
    }, [tooltip.current, parent.current]);
    return (
        <div ref={tooltip} className={styles.tooltip} data-testid={dataTestId + '-tooltip'}>
            {text}
        </div>
    );
};
