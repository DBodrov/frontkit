import classnames from 'classnames';
import React from 'react';
import { getCardData, RANDOM_DATA } from './ramdomizer';
import { isInvalidInput, validate, isFormInvalid } from './validators';
import { format } from './formatters';
import styles from './PaymentCard.module.css';
import { SmallInput, BackgroundProp } from '../Input';
import { BankLogos } from './BanksLogos';
import { DatePicker } from '../DatePicker';

interface PaymentCardsProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to Paymentcard to change styling */
    className?: string;
    /** Inline style objects passed to Paymentcard wrapper */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default PaymentCard
     * */
    dataTestId?: string;
    /** array of bank images */
    images?: Array<{ url: string; name: string }>;
    /** Function passed to Paymentcard to check success */
    onSuccess?: (successed: boolean) => unknown;
    /** Function passed to Paymentcard to get state */
    onPaymentDataChange?: (state: FormFieldsTypes) => unknown;
    /** disabled add inputs */
    disabled?: boolean;
    /** dataPicker or input */
    datePicker?: boolean;
    /** need generate id and names for inputs */
    randomNames?: boolean;
}

interface PaymentCardProps extends React.HTMLAttributes<HTMLElement> {
    dataTestId?: string;
    /** Object of errors passed to Paymentcard to change validation styling */
    errors: ErrorsTypes;
    cardNumber?: string;
    /** disabled add inputs */
    disabled?: boolean;
    datePicker?: boolean;
    randomNames?: boolean;
}

const frontCardCls = classnames(styles.cardWrapper, styles.frontCard);
const backCardCls = classnames(styles.cardWrapper, styles.backCard);
const cvvCls = classnames(styles.mb10, styles.cvv);

interface CardInputProps extends React.ComponentProps<typeof SmallInput> {
    error: boolean;
}

export const CardInput = ({ error, ...rest }: CardInputProps): JSX.Element => (
    <SmallInput background={error ? BackgroundProp.Error : BackgroundProp.White} {...rest} />
);

export function PaymentCard({ cardNumber, errors, dataTestId, disabled, datePicker, randomNames = false }: PaymentCardProps): JSX.Element {
    const cardData = getCardData(randomNames);
    return (
        <div className={frontCardCls}>
            <BankLogos cardNumber={cardNumber} />
            <div className={styles.frontCardInputs}>
                <CardInput
                    type="tel"
                    name={cardData.cardNumber.name}
                    id={cardData.cardNumber.name}
                    placeholder={cardData.cardNumber.placeholderText}
                    className={styles.mb10}
                    error={errors[cardData.cardNumber.name]}
                    disabled={disabled}
                    autoComplete={cardData.cardNumber.autoComplete}
                    dataTestId={dataTestId + '-' + cardData.cardNumber.name}
                />
                <div className={styles.flex}>
                    <CardInput
                        name={cardData.ccName.name}
                        id={cardData.ccName.name}
                        placeholder={cardData.ccName.placeholderText}
                        className={styles.ccName}
                        error={errors[cardData.ccName.name]}
                        autoComplete={cardData.ccName.autoComplete}
                        dataTestId={dataTestId + '-' + cardData.ccName.name}
                        disabled={disabled}
                    />
                    {datePicker ? (
                        <DatePicker
                            name={cardData.ccExp.name}
                            error={errors[cardData.ccExp.name]}
                            disabled={disabled}
                            className={styles.datePickerWrap}
                            dataTestId={dataTestId + '-picker-' + cardData.ccExp.name}
                        />
                    ) : (
                        <CardInput
                            type="tel"
                            name={cardData.ccExp.name}
                            id={cardData.ccExp.name}
                            placeholder={cardData.ccExp.placeholderText}
                            maxLength={5}
                            className={styles.ccExp}
                            error={errors[cardData.ccExp.name]}
                            autoComplete={cardData.ccExp.autoComplete}
                            dataTestId={dataTestId + '-' + cardData.ccExp.name}
                            disabled={disabled}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function PaymentCardBack({ errors, dataTestId, disabled, randomNames = false }: PaymentCardProps): JSX.Element {
    const cardData = getCardData(randomNames);
    return (
        <div className={backCardCls}>
            <div className={styles.magneticStrip} />
            <div className={styles.backCardBlock}>
                <CardInput
                    type="tel"
                    name={cardData.ccCsc.name}
                    id={cardData.ccCsc.name}
                    placeholder={cardData.ccCsc.placeholderText}
                    className={cvvCls}
                    maxLength={3}
                    error={errors[cardData.ccCsc.name]}
                    autoComplete={cardData.ccCsc.autoComplete}
                    dataTestId={dataTestId + '-' + cardData.ccCsc.name}
                    disabled={disabled}
                />
                <div className={styles.cardText}>Последние 3 цифры на оборотной стороне карты</div>
            </div>
        </div>
    );
}

const form = {
    ccNumber: '',
    ccName: '',
    ccExp: '',
    ccCsc: '',
    [RANDOM_DATA.cardNumber.name]: '',
    [RANDOM_DATA.ccName.name]: '',
    [RANDOM_DATA.ccExp.name]: '',
    [RANDOM_DATA.ccCsc.name]: '',
};

export type FormFieldsTypes = typeof form;
export type nameType = keyof FormFieldsTypes;
const errors = {
    ccNumber: false,
    ccName: false,
    ccExp: false,
    ccCsc: false,
    [RANDOM_DATA.cardNumber.name]: false,
    [RANDOM_DATA.ccName.name]: false,
    [RANDOM_DATA.ccExp.name]: false,
    [RANDOM_DATA.ccCsc.name]: false,
};

export type ErrorsTypes = typeof errors;

function formStateFormatter<T>(formState: FormFieldsTypes | ErrorsTypes): T {
    return ({
        ccNumber: formState.ccNumber || formState[RANDOM_DATA.cardNumber.name],
        ccName: formState.ccName || formState[RANDOM_DATA.ccName.name],
        ccExp: formState.ccExp || formState[RANDOM_DATA.ccExp.name],
        ccCsc: formState.ccCsc || formState[RANDOM_DATA.ccCsc.name],
    } as unknown) as T;
}

export function PaymentCards({
    className,
    style,
    dataTestId = 'PaymentCard',
    onSuccess = (): void => {},
    onPaymentDataChange = (): void => {},
    disabled = false,
    datePicker = false,
    randomNames = false,
}: PaymentCardsProps): JSX.Element {
    const [formState, setFormState] = React.useState(form);
    const [formErrors, setError] = React.useState(errors);

    React.useEffect(() => {
        onPaymentDataChange(formStateFormatter<FormFieldsTypes>(formState));
        onSuccess(isFormInvalid(formStateFormatter<ErrorsTypes>(formErrors), formStateFormatter<FormFieldsTypes>(formState)));
    }, [formErrors, formState, onPaymentDataChange, onSuccess]);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const element = event.target;
        const { name, value } = element;
        if (isInvalidInput(name, value)) {
            element.value = formState[name];
            return;
        }

        const elementSelection = element.selectionStart;
        if (elementSelection === null) {
            onSuccess(false);
            return;
        }
        let elementNextSelection = elementSelection;
        const prev = formState[name].replace(/\s/g, '').length;
        const cur = value.replace(/\s/g, '').length;
        const error = !validate(name, element.value);

        switch (name) {
            case 'ccNumber':
            case RANDOM_DATA.cardNumber.name:
                if (cur >= prev) {
                    if (elementSelection % 5 === 0) {
                        elementNextSelection += 1;
                    }
                }
                break;
            case 'ccExp':
            case RANDOM_DATA.ccExp.name:
                if (cur >= prev) {
                    if (elementSelection === 3) {
                        elementNextSelection += 1;
                    }
                    if (elementSelection === 5 && !error) {
                        const cardData = getCardData(randomNames);
                        setTimeout(() => document.getElementsByName(cardData.ccCsc.name)[0]?.focus(), 10);
                    }
                }
                break;
            default:
                break;
        }

        element.value = format(name, value);
        setError({ ...formErrors, [name]: error });
        setFormState({ ...formState, [name]: element.value });
        element.setSelectionRange(elementNextSelection, elementNextSelection);
    };

    const wrapperCls = classnames(styles.globalRelativeWrapper, className);
    return (
        <div className={wrapperCls} data-testid={dataTestId}>
            <div className={styles.mobileAbsolute}>
                <div className={styles.wrapper} style={style}>
                    <div className={styles.cardsWrapper} onChange={handleFormChange}>
                        <PaymentCard
                            randomNames={randomNames}
                            disabled={disabled}
                            errors={formErrors}
                            dataTestId={dataTestId}
                            cardNumber={formState.ccNumber || formState[RANDOM_DATA.cardNumber.name]}
                            datePicker={datePicker}
                        />
                        <PaymentCardBack randomNames={randomNames} disabled={disabled} errors={formErrors} dataTestId={dataTestId} />
                    </div>
                </div>
            </div>
        </div>
    );
}
