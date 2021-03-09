import React, { useState } from 'react';
import DatePickerBase, { registerLocale } from 'react-datepicker';
import './react-datepicker.css';
import './custom-styles.css';
import { CardInput } from '../PaymentCard/PaymentCard';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

interface CustomInput {
    value?: string | undefined;
    error: boolean;
    name: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    handleChange: (v: string | undefined) => void;
    disabledInput?: boolean;
    dataTestId?: string;
}

interface DatePickerInterface {
    error: boolean;
    name: string;
    disabled?: boolean;
    className?: string;
    dataTestId?: string;
}

const CustomInput = ({ value, onClick, error, name, handleChange, dataTestId, disabledInput, ...rest }: CustomInput): JSX.Element => {
    React.useEffect(() => handleChange(value), [value, handleChange]);
    return (
        <CardInput
            {...rest}
            readOnly
            disabled={disabledInput}
            onClick={onClick}
            dataTestId={dataTestId}
            value={value}
            error={error}
            type="tel"
            id={name}
            name={name}
        />
    );
};

export function DatePicker({ name, error, disabled, className, dataTestId }: DatePickerInterface): JSX.Element {
    const [startDate, setStartDate] = useState();
    const [value, setValue] = useState();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = React.useCallback(val => setValue(val), [setValue]);
    React.useEffect(() => {
        if (!value || !inputRef.current) return;
        const ev = new Event('input', { bubbles: true });
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        inputRef.current._valueTracker?.setValue();
        inputRef.current.dispatchEvent(ev);
    }, [value, inputRef.current]);

    return (
        <div className={className}>
            <input ref={inputRef} name={name} style={{ display: 'none' }} value={value} />
            <DatePickerBase
                selected={startDate}
                onChange={(value: Date) => setStartDate(value)}
                locale="ru"
                dateFormat="MM/yy"
                showMonthYearPicker
                placeholderText="ММ/ГГ"
                customInput={
                    <CustomInput disabledInput={disabled} dataTestId={dataTestId} handleChange={handleChange} name={name} error={error} />
                }
            />
        </div>
    );
}
