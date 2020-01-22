import classnames from 'classnames';
import React from 'react';

import { isInvalidInput, validate, isFormInvalid } from './validators';
import { format } from './formatters';

import styles from './PaymentCard.module.css';

import { SmallInput, BackgroundProp } from '../Input';

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
}

interface PaymentCardProps extends React.HTMLAttributes<HTMLElement> {
    dataTestId?: string;
    /** Object of errors passed to Paymentcard to change validation styling */
    errors: ErrorsTypes;
    images?: Array<{ url: string; name: string }>;
}

const frontCardCls = classnames(styles.cardWrapper, styles.frontCard);
const backCardCls = classnames(styles.cardWrapper, styles.backCard);
const cvvCls = classnames(styles.mb10, styles.cvv);

interface CardInputProps extends React.ComponentProps<typeof SmallInput> {
    error: boolean;
}

const CardInput = ({ error, ...rest }: CardInputProps): JSX.Element => (
    <SmallInput background={error ? BackgroundProp.Error : BackgroundProp.White} {...rest} />
);

export function PaymentCard({ images, errors, dataTestId }: PaymentCardProps): JSX.Element {
    return (
        <div className={frontCardCls}>
            <div>{images && images.map(image => <img key={image.name} src={image.url} alt={image.name} />)}</div>
            <div>
                <CardInput
                    name="ccNumber"
                    placeholder="Номер карты"
                    className={styles.mb10}
                    error={errors['ccNumber']}
                    autoComplete="cc-number"
                    dataTestId={dataTestId + '-ccNumber'}
                />
                <div className={styles.flex}>
                    <CardInput
                        name="ccName"
                        placeholder="Владелец карты"
                        className={styles.ccName}
                        error={errors['ccName']}
                        autoComplete="cc-name"
                        dataTestId={dataTestId + '-ccName'}
                    />
                    <CardInput
                        name="ccExp"
                        placeholder="ММ/ГГ"
                        maxLength={5}
                        error={errors['ccExp']}
                        autoComplete="cc-exp"
                        dataTestId={dataTestId + '-ccExp'}
                    />
                </div>
            </div>
        </div>
    );
}

function PaymentCardBack({ errors, dataTestId }: PaymentCardProps): JSX.Element {
    return (
        <div className={backCardCls}>
            <div className={styles.magneticStrip}></div>
            <div className={styles.backCardBlock}>
                <CardInput
                    name="ccCsc"
                    type="text"
                    placeholder="CVV/CVC"
                    className={cvvCls}
                    maxLength={3}
                    error={errors['ccCsc']}
                    autoComplete="cc-csc"
                    dataTestId={dataTestId + '-ccCsc'}
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
};

export type FormFieldsTypes = typeof form;
export type nameType = keyof FormFieldsTypes;
const errors = {
    ccNumber: false,
    ccName: false,
    ccExp: false,
    ccCsc: false,
};

export type ErrorsTypes = typeof errors;

export function PaymentCards({
    className,
    style,
    dataTestId = 'PaymentCard',
    onSuccess = (): void => {},
    onPaymentDataChange = (): void => {},
}: PaymentCardsProps): JSX.Element {
    const [formState, setFormState] = React.useState(form);
    const [formErrors, setError] = React.useState(errors);

    React.useEffect(() => {
        onPaymentDataChange(formState);
        onSuccess(isFormInvalid(formErrors, formState));
    }, [formErrors, formState, onPaymentDataChange, onSuccess]);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const element = event.target;
        const { name, value } = element;
        const typedNames = name as nameType;
        if (isInvalidInput(typedNames, value)) {
            element.value = formState[typedNames];
            return;
        }

        const elementSelection = element.selectionStart;
        if (elementSelection === null) {
            onSuccess(false);
            return;
        }
        let elementNextSelection = elementSelection;
        const prev = formState[typedNames].replace(/\s/g, '').length;
        const cur = value.replace(/\s/g, '').length;

        switch (typedNames) {
            case 'ccNumber':
                if (cur >= prev) {
                    if (elementSelection % 5 === 0) {
                        elementNextSelection += 1;
                    }
                }
                break;
            case 'ccExp':
                if (cur >= prev) {
                    if (elementSelection === 3) {
                        elementNextSelection += 1;
                    }
                }
                break;
            default:
                break;
        }

        element.value = format(typedNames, value);
        setError({ ...formErrors, [typedNames]: !validate(typedNames, element.value) });
        setFormState({ ...formState, [typedNames]: element.value });
        element.setSelectionRange(elementNextSelection, elementNextSelection);
    };

    const wrapperCls = classnames(styles.wrapper, className);
    return (
        <div className={wrapperCls} style={style} data-testid={dataTestId}>
            <div className={styles.cardsWrapper} onChange={handleFormChange}>
                <PaymentCard errors={formErrors} dataTestId={dataTestId} />
                <PaymentCardBack errors={formErrors} dataTestId={dataTestId} />
            </div>
        </div>
    );
}
