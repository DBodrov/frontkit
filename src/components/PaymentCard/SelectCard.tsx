import classnames from 'classnames';
import React from 'react';
import { Box } from '../Box';
import cn from 'classnames';
import { Spinner } from '../Spinner';
import { isInvalidInput, validate } from './validators';

import styles from './SelectCard.module.css';
import paymentCardsStyles from './PaymentCard.module.css';

import { BankLogos } from './BanksLogos';
import { CardInput } from './PaymentCard';

export function WarningIcon({ dataTestId = 'warning-icon' }): JSX.Element {
    return (
        <svg data-testid={dataTestId} width="59" height="56" viewBox="0 0 59 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="59" height="56" fill="url(#pattern0)" />
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0" transform="translate(-0.00249252) scale(0.0139581 0.0147059)" />
                </pattern>
                <image
                    id="image0"
                    width="72"
                    height="68"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
}

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
    /** Function passed to SelectCard to delete card */
    onDelete?: (data: CardProps) => void;
    /** Function passed to SelectCard to first click on delete card */
    onPreDelete?: (status: boolean) => void;
    /** data card */
    data: CardProps;
    /** active */
    active: boolean;
    /** loading */
    loading?: boolean;
    /** disabled */
    disabled?: boolean;
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
    onDelete,
    onPreDelete,
    disabled = false,
    active,
    loading = false,
}: SelectCardProps): JSX.Element {
    const [cvcState, setCvcState] = React.useState(getForm(data.id));
    const [error, setError] = React.useState(false);
    const [showDeleteWrapper, setShowDeleteWrapper] = React.useState(false);

    React.useEffect(() => {
        const success = validate('ccCsc', cvcState.ccCsc);
        onPaymentDataChange(cvcState);
        onSuccess(success);
    }, [cvcState.ccCsc, onPaymentDataChange, onSuccess]);

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

    const handleClick = React.useCallback(() => {
        onPreDelete && onPreDelete(!showDeleteWrapper);
        setCvcState(getForm(data.id));
        setShowDeleteWrapper(!showDeleteWrapper);
    }, [setShowDeleteWrapper, showDeleteWrapper, onPreDelete, setCvcState]);

    const handleDeleteClick = React.useCallback(() => {
        onDelete && onDelete(data);
        setShowDeleteWrapper(s => !s);
    }, [onDelete, data, setShowDeleteWrapper]);

    const wrapperCls = classnames(styles.wrapper, className, { [styles.active]: active || showDeleteWrapper || loading });
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

                <div className={cn(styles.cvv, { [styles.hidden]: !active })}>
                    <CardInput
                        autoFocus
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

                <button type="button" className={cn(styles.delete, { [styles.hidden]: !onDelete })} onClick={handleClick}>
                    Удалить
                </button>
                {showDeleteWrapper && !loading && (
                    <div className={styles.deleteWrap}>
                        <WarningIcon />
                        <div className={styles.deleteText}>Вы точно хотите удалить карту?</div>
                        <div className={styles.btnWrap}>
                            <button type="button" className={cn(styles.btn, styles.btnYes)} onClick={handleDeleteClick}>
                                Да
                            </button>
                            <button type="button" className={cn(styles.btn, styles.btnNo)} onClick={handleClick}>
                                Нет
                            </button>
                        </div>
                    </div>
                )}
                {loading && (
                    <div className={cn(styles.deleteWrap, styles.spinnerWrap)}>
                        <Spinner />
                    </div>
                )}
                {disabled && <div className={styles.disabled} />}
            </div>
        </Box>
    );
}
