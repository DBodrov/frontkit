import React from 'react';
import styles from './BaseInput.module.css';
import cn from 'classnames';
import { Props } from './types';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

export enum BackgroundProp {
    None,
    Success,
    Error,
    White,
}

interface BaseInputProps extends Props {
    leftPartClassName?: string;
    rightPartClassName?: string;
    inputClassName?: string;
}

function getBackgroundClass(background?: BackgroundProp): string {
    return cn({
        [styles.defaultInput]: background === undefined,
        [styles.defaultInput]: background === BackgroundProp.None,
        [styles.error]: background === BackgroundProp.Error,
        [styles.success]: background === BackgroundProp.Success,
        [styles.white]: background === BackgroundProp.White,
    });
}
function useFocus(autoFocus: boolean): [boolean, () => void, () => void, React.RefObject<HTMLDivElement>] {
    const [focused, setFocused] = React.useState(autoFocus);
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

export function BaseInput({
    right = false,
    value,
    placeholder,
    LeftIcon,
    RightIcon,
    background,
    className,
    autoFocus = false,
    style,
    dataTestId = 'input',
    leftPartClassName,
    rightPartClassName,
    inputClassName,
    showOutline = true,
    disabled = false,
    ...rest
}: BaseInputProps): JSX.Element {
    const [focused, onFocus, onBlur, fieldRef] = useFocus(autoFocus);
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
    const wrapperClassName = cn(styles.wrapper, { [styles.focused]: focused && showOutline }, className);
    const inputTotalClassName = cn(
        styles.input,
        styles.inputArea,
        backgroundClass,
        { [styles.right]: right, [styles.leftIconExist]: LeftIcon },
        inputClassName,
    );

    return (
        <div className={wrapperClassName} ref={fieldRef} style={style} data-testid={dataTestId}>
            <div
                className={cn(styles.input, styles.leftArea, backgroundClass, leftPartClassName, { [styles.disabled]: disabled })}
                onClick={onFocus}
                data-testid={dataTestId + '-left'}
            >
                {LeftIcon && <LeftIcon />}
            </div>
            <input
                autoFocus={autoFocus}
                value={value}
                placeholder={placeholder}
                className={inputTotalClassName}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                data-testid={dataTestId + '-input'}
                {...rest}
            />
            <div
                className={cn(styles.input, styles.rightArea, backgroundClass, rightPartClassName, { [styles.disabled]: disabled })}
                onClick={onFocus}
                data-testid={dataTestId + '-right'}
            >
                {RightIcon && <RightIcon />}
            </div>
        </div>
    );
}
