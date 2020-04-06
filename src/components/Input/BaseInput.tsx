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
    Warning,
}

interface BaseInputProps extends Props {
    leftPartClassName?: string;
    rightPartClassName?: string;
}

function getBackgroundClass(background: BackgroundProp): string {
    return cn({
        [styles.defaultInput]: background === BackgroundProp.None,
        [styles.error]: background === BackgroundProp.Error,
        [styles.success]: background === BackgroundProp.Success,
        [styles.white]: background === BackgroundProp.White,
        [styles.warning]: background === BackgroundProp.Warning,
    });
}
function useFocus(
    autoFocus: boolean,
    rest: Pick<BaseInputProps, 'onFocus' | 'onBlur'>,
): [
    boolean,
    (event: React.FocusEvent<HTMLInputElement>) => void,
    (event: React.FocusEvent<HTMLInputElement>) => void,
    React.RefObject<HTMLDivElement>,
] {
    const [focused, setFocused] = React.useState(autoFocus);
    const inputRef = React.useRef<HTMLDivElement>(null);

    const onFocus = React.useCallback(
        event => {
            event.type === 'focus' && rest.onFocus && rest.onFocus(event);
            setFocused(true);
        },
        [setFocused, rest],
    );
    const onBlur = React.useCallback(
        event => {
            rest.onBlur && rest.onBlur(event);
            setFocused(false);
        },
        [setFocused, rest],
    );

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
    background = BackgroundProp.None,
    className,
    autoFocus = false,
    style,
    dataTestId = 'input',
    leftPartClassName,
    rightPartClassName,
    inputClassName,
    showOutline = true,
    disabled = false,
    disableLeftBorderRadius = false,
    disableRightBorderRadius = false,
    ...rest
}: BaseInputProps): JSX.Element {
    const [focused, onFocus, onBlur, fieldRef] = useFocus(autoFocus, rest);
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
                className={cn(styles.input, styles.leftArea, backgroundClass, leftPartClassName, {
                    [styles.disabled]: disabled,
                    [styles.leftAreaBorderRadius]: !disableLeftBorderRadius,
                })}
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                onClick={onFocus}
                data-testid={dataTestId + '-left'}
            >
                {LeftIcon && <LeftIcon />}
            </div>
            <input
                {...rest}
                autoFocus={autoFocus}
                value={value}
                placeholder={placeholder}
                className={inputTotalClassName}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                data-testid={dataTestId + '-input'}
            />
            <div
                className={cn(styles.input, styles.rightArea, backgroundClass, rightPartClassName, {
                    [styles.disabled]: disabled,
                    [styles.rightAreaBorderRadius]: !disableRightBorderRadius,
                })}
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                onClick={onFocus}
                data-testid={dataTestId + '-right'}
            >
                {RightIcon && <RightIcon />}
            </div>
        </div>
    );
}
