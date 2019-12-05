import classnames from 'classnames';
import React from 'react';

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
    /** array of bank images */
    images?: Array<{ url: string; name: string }>;
}

const frontCardCls = classnames(styles.cardWrapper, styles.frontCard);
const backCardCls = classnames(styles.cardWrapper, styles.backCard);

const LittleInput = (props: any) => <SmallInput background={BackgroundProp.White} {...props} />;

export function PaymentCard({ className, style, dataTestId = 'PaymentCard', images, ...rest }: PaymentCardProps): JSX.Element {
    return (
        <div className={frontCardCls}>
            <div>{images && images.map(image => <img src={image.url} alt={image.name} />)}</div>
            <div>
                <LittleInput name="cc-number" placeholder="Номер карты" className={styles.mb10} autoComplete="cc-number" />
                <div className={styles.flex}>
                    <LittleInput name="cc-name" placeholder="Владелец карты" className={styles.ccName} autoComplete="cc-name" />
                    <LittleInput name="cc-exp" placeholder="ММ/ГГ" maxLength="3" autoComplete="cc-exp" />
                </div>
            </div>
        </div>
    );
}

export function PaymentCardBack({ className, style, dataTestId = 'PaymentCard', ...rest }: PaymentCardProps): JSX.Element {
    return (
        <div className={backCardCls}>
            <div className={styles.magneticStrip}></div>
            <div className={styles.backCardBlock}>
                <LittleInput name="cc-csc" type="text" placeholder="CVV/CVC" className={styles.mb10} maxLength="3" autoComplete="cc-csc" />
                <div className={styles.cardText}>Последние 3 цифры на оборотной стороне карты</div>
            </div>
        </div>
    );
}

export function PaymentCards({ className, style, dataTestId = 'PaymentCard', ...rest }: PaymentCardProps): JSX.Element {
    return (
        <div className={styles.wrapper}>
            <div className={styles.cardsWrapper}>
                <PaymentCard />
                <PaymentCardBack />
            </div>
        </div>
    );
}
