import classnames from 'classnames';
import React from 'react';

import { isInvalidInput, validate, isFormInvalid } from './validators';
import { format } from './formatters';

import styles from './PaymentCard.module.css';

import { SmallInput, BackgroundProp } from '../Input';

interface PaymentCardProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to Paymentcard to change styling */
    className?: string;
    /** Inline style objects passed to Paymentcard wrapper */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default PaymentCard
     * */
    dataTestId?: string;
    /** Object of errors passed to Paymentcard to change validation styling */
    errors?: ErrorsTypes;
    /** array of bank images */
    images?: Array<{ url: string; name: string }>;
    /** Function passed to Paymentcard to check success */
    onSuccess?: (successed: boolean) => unknown;
}

const frontCardCls = classnames(styles.cardWrapper, styles.frontCard);
const backCardCls = classnames(styles.cardWrapper, styles.backCard);
const cvvCls = classnames(styles.mb10, styles.cvv);

interface CardInputProps extends React.ComponentProps<typeof SmallInput> {
    error: boolean;
}

const CardInput = ({ error, ...rest }: CardInputProps) => (
    <SmallInput background={error ? BackgroundProp.Error : BackgroundProp.White} {...rest} />
);

export function PaymentCard({ images, errors, dataTestId }: PaymentCardProps): JSX.Element {
    if (errors === undefined) {
        throw new Error();
    }
    return (
        <div className={frontCardCls}>
            <div>{images && images.map(image => <img src={image.url} alt={image.name} />)}</div>
            <div>
                <CardInput
                    name="cc-number"
                    placeholder="Номер карты"
                    className={styles.mb10}
                    error={errors['cc-number']}
                    autoComplete="cc-number"
                    data-testid={dataTestId + '-cc-number'}
                />
                <div className={styles.flex}>
                    <CardInput
                        name="cc-name"
                        placeholder="Владелец карты"
                        className={styles.ccName}
                        error={errors['cc-name']}
                        autoComplete="cc-name"
                        data-testid={dataTestId + '-cc-name'}
                    />
                    <CardInput
                        name="cc-exp"
                        placeholder="ММ/ГГ"
                        maxLength={5}
                        error={errors['cc-exp']}
                        autoComplete="cc-exp"
                        data-testid={dataTestId + '-cc-exp'}
                    />
                </div>
            </div>
        </div>
    );
}

function PaymentCardBack({ errors, dataTestId }: PaymentCardProps): JSX.Element {
    if (errors === undefined) {
        throw new Error();
    }
    return (
        <div className={backCardCls}>
            <div className={styles.magneticStrip}></div>
            <div className={styles.backCardBlock}>
                <CardInput
                    name="cc-csc"
                    type="text"
                    placeholder="CVV/CVC"
                    className={cvvCls}
                    maxLength={3}
                    error={errors['cc-csc']}
                    autoComplete="cc-csc"
                    data-testid={dataTestId + '-cc-csc'}
                />
                <div className={styles.cardText}>Последние 3 цифры на оборотной стороне карты</div>
            </div>
        </div>
    );
}

export interface FormFieldsTypes {
    [key: string]: string;
}

export interface ErrorsTypes {
    [key: string]: boolean;
}

const form: FormFieldsTypes = {
    'cc-number': '',
    'cc-name': '',
    'cc-exp': '',
    'cc-csc': '',
};

const errors: ErrorsTypes = {
    'cc-number': false,
    'cc-name': false,
    'cc-exp': false,
    'cc-csc': false,
};

export function PaymentCards({ className, style, dataTestId = 'PaymentCard', onSuccess }: PaymentCardProps) {
    const [formState, setFormState] = React.useState(form);
    const [formErrors, setError] = React.useState(errors);

    React.useEffect(() => {
        onSuccess && onSuccess(isFormInvalid(formErrors, formState));
    }, [formErrors]);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const element = event.target;

        if (isInvalidInput(name, value)) {
            element.value = formState[name];
            return;
        }

        const elementSelection = element.selectionStart;
        if (elementSelection === null) {
            throw new Error();
        }
        let elementNextSelection = elementSelection;
        const prev = formState[name].replace(/\s/g, '').length;
        const cur = value.replace(/\s/g, '').length;

        switch (event.target.name) {
            case 'cc-number':
                if (cur >= prev) {
                    if (elementSelection % 5 === 0) {
                        elementNextSelection += 1;
                    }
                }
                break;
            case 'cc-exp':
                if (cur >= prev) {
                    if (elementSelection === 3) {
                        elementNextSelection += 1;
                    }
                }
                break;
            default:
                break;
        }

        element.value = format(name, value);
        setError({ ...formErrors, [name]: !validate(name, element.value) });
        setFormState({ ...formState, [name]: element.value });
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
