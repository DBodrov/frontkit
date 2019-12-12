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

type BaseInputProps = {
    leftPartClassName?: string;
    rightPartClassName?: string;
    inputClassName?: string;
} & Props;

function getBackgroundClass(background?: BackgroundProp): string {
    return cn({
        [styles.error]: background === BackgroundProp.Error,
        [styles.success]: background === BackgroundProp.Success,
        [styles.white]: background === BackgroundProp.White,
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

export function BaseInput({
    right = false,
    value,
    placeholder,
    LeftIcon,
    RightIcon,
    background,
    className,
    style,
    dataTestId = 'input',
    leftPartClassName,
    rightPartClassName,
    inputClassName,
    showOutline = true,
    ...rest
}: BaseInputProps): JSX.Element {
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
                className={cn(styles.input, styles.leftArea, backgroundClass, leftPartClassName)}
                onClick={onFocus}
                data-testid={dataTestId + '-left'}
            >
                {LeftIcon && <LeftIcon />}
            </div>
            <input
                value={value}
                placeholder={placeholder}
                className={inputTotalClassName}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                data-testid={dataTestId + '-input'}
                {...rest}
            />
            <div
                className={cn(styles.input, styles.rightArea, backgroundClass, rightPartClassName)}
                onClick={onFocus}
                data-testid={dataTestId + '-right'}
            >
                {RightIcon && <RightIcon />}
            </div>
        </div>
    );
}
