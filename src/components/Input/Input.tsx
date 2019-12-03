import React, { DependencyList, EffectCallback } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';
import { IconProps } from './Icons';

export enum BackgroundProp {
    None,
    Success,
    Error,
}

type Props = {
    value?: string;
    RightIcon?: React.ComponentType<IconProps>;
    LeftIcon?: React.ComponentType<IconProps>;
    background?: BackgroundProp;
    dataTestId?: string;
} & React.HTMLAttributes<HTMLInputElement>;

function getBackgroundClass(background?: BackgroundProp): string {
    return cn({
        [styles.error]: background === BackgroundProp.Error,
        [styles.success]: background === BackgroundProp.Success,
    });
}

function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, f: EffectCallback, deps: DependencyList): void {
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

function useFocus(): [boolean, () => void, () => void, React.RefObject<HTMLDivElement>] {
    const [focused, setFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLDivElement>(null);

    const onFocus = React.useCallback(() => setFocused(true), [setFocused]);
    const onBlur = React.useCallback(() => setFocused(false), [setFocused]);

    useOnClickOutside(
        inputRef,
        () => {
            if (!focused) {
                return;
            }

            setFocused(false);
        },
        [focused, setFocused],
    );

    return [focused, onFocus, onBlur, inputRef];
}

export function Input({ value, placeholder, LeftIcon, RightIcon, background, className, style, dataTestId, ...rest }: Props): JSX.Element {
    const [focused, onFocus, onBlur, fieldRef] = useFocus();
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const { current } = inputRef;
        if (!current) {
            return;
        }
        if (focused) {
            current.focus();
        } else {
            current.blur();
        }
    }, [focused]);

    const backgroundClass = getBackgroundClass(background);
    const wrapperClassName = cn(styles.wrapper, { [styles.focused]: focused });

    return (
        <div className={wrapperClassName} ref={fieldRef} style={style} data-testid={dataTestId}>
            <div className={cn(styles.input, styles.leftArea, backgroundClass)} onClick={onFocus} data-testid={dataTestId + '-left'}>
                {LeftIcon && <LeftIcon />}
            </div>
            <input
                value={value}
                placeholder={placeholder}
                className={cn(styles.input, styles.inputArea, backgroundClass, className)}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                data-testid={dataTestId + '-input'}
                {...rest}
            />
            <div className={cn(styles.input, styles.rightArea, backgroundClass)} onClick={onFocus} data-testid={dataTestId + '-right'}>
                {RightIcon && <RightIcon />}
            </div>
        </div>
    );
}
