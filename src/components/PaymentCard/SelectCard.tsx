import classnames from 'classnames';
import React from 'react';
import { Box } from '../Box';

import { isInvalidInput, validate } from './validators';

import styles from './SelectCard.module.css';
import paymentCardsStyles from './PaymentCard.module.css';

import { BankLogos } from './BanksLogos';
import { CardInput } from './PaymentCard';

interface SelectCardProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed to SelectCard to change styling */
    className?: string;
    /** Inline style objects passed to SelectCard wrapper */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default SelectCard
     * */
    dataTestId?: string;
    /** array of bank images */
    images?: Array<{ url: string; name: string }>;
    /** Function passed to SelectCard to check success */
    onSuccess?: (successed: boolean) => unknown;
    /** Function passed to SelectCard to get state */
    onPaymentDataChange?: (state: FormFieldsTypes) => unknown;
    /** data card */
    data: CardProps;
    /** active */
    active: boolean;
}

interface CardProps {
    default: boolean;
    link: string;
    id: string;
    title: string;
    type: string;
}

const form = {
    id: '',
    ccCsc: '',
};

const getForm = (id: string) => ({ ...form, id });

export type FormFieldsTypes = typeof form;

export function SelectCard({
    className,
    style,
    dataTestId = 'SelectCard',
    data,
    onSuccess = (): void => {},
    onPaymentDataChange = (): void => {},
    active,
}: SelectCardProps): JSX.Element {
    const [cvcState, setCvcState] = React.useState(getForm(data.id));
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const success = validate('ccCsc', cvcState.ccCsc);
        onPaymentDataChange(cvcState);
        onSuccess(success);
    }, [cvcState, onPaymentDataChange, onSuccess]);

    React.useEffect(() => {
        setError(false);
        setCvcState(getForm(data.id));
    }, [active, setError, data, setCvcState]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const element = event.target;
        const { value } = element;
        if (isInvalidInput('ccCsc', value)) {
            element.value = cvcState.ccCsc;
            return;
        }

        const isError = !validate('ccCsc', value);

        setError(isError);
        setCvcState(s => ({ ...s, ccCsc: value }));
    };

    const wrapperCls = classnames(styles.wrapper, className, { [styles.active]: active });
    return (
        <Box className={wrapperCls} style={style} dataTestId={dataTestId}>
            <div className={styles.card}>
                <div className={styles.image}>
                    <BankLogos type={data.type} link={data.link} />
                </div>
                <div className={styles.title}>
                    {data.title
                        .split(' ')
                        .reverse()
                        .join(' ')}
                    {/*смотри стили этого блока, там идет разворот слов назад для многоточия вначале предложения*/}
                </div>

                {active && (
                    <div className={styles.cvv}>
                        <CardInput
                            type="tel"
                            name="ccCsc"
                            id="ccCsc"
                            placeholder="CVC"
                            className={paymentCardsStyles.cvv}
                            maxLength={3}
                            error={error}
                            dataTestId={dataTestId + '-ccCsc'}
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>
        </Box>
    );
}
