import React from 'react';
import styles from './Input.module.css';
import cn from 'classnames';
import { IconProps } from './Icons';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

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
    right?: boolean;
} & React.HTMLAttributes<HTMLInputElement>;

function getBackgroundClass(background?: BackgroundProp): string {
    return cn({
        [styles.error]: background === BackgroundProp.Error,
        [styles.success]: background === BackgroundProp.Success,
    });
}
function useFocus(): [boolean, () => void, () => void, React.RefObject<HTMLDivElement>] {
    const [focused, setFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLDivElement>(null);

    const onFocus = React.useCallback(() => setFocused(true), [setFocused]);
    const onBlur = React.useCallback(() => setFocused(false), [setFocused]);

    useOnClickOutside(
        inputRef,
        () => {
            setFocused(false);
        },
        [setFocused],
    );

    return [focused, onFocus, onBlur, inputRef];
}

export function Input({
    right = false,
    value,
    placeholder,
    LeftIcon,
    RightIcon,
    background,
    className,
    style,
    dataTestId = 'input',
    ...rest
}: Props): JSX.Element {
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
    const inputClassName = cn(styles.input, styles.inputArea, backgroundClass, className, { [styles.right]: right });

    return (
        <div className={wrapperClassName} ref={fieldRef} style={style} data-testid={dataTestId}>
            <div className={cn(styles.input, styles.leftArea, backgroundClass)} onClick={onFocus} data-testid={dataTestId + '-left'}>
                {LeftIcon && <LeftIcon />}
            </div>
            <input
                value={value}
                placeholder={placeholder}
                className={inputClassName}
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
