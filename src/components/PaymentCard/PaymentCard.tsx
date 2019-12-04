import classnames from 'classnames';
import React from 'react';

import styles from './PaymentCard.module.css';

import { Input } from '../Input';

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

const frontCardCls = classnames(styles.cardWrapper, styles.frontCardWrapper);
const backCardCls = classnames(styles.cardWrapper, styles.backCardWrapper);

const LittleInput = ({ style }: any) => <input style={{ ...style }} />;

export function PaymentCard({ className, style, dataTestId = 'PaymentCard', images, ...rest }: PaymentCardProps): JSX.Element {
    return (
        <div>
            <div className={frontCardCls}>
                <div>{images && images.map(image => <img src={image.url} alt={image.name} />)}</div>
                <div>
                    <LittleInput />
                    <div style={{ display: 'flex' }}>
                        <LittleInput />
                        <LittleInput />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PaymentCardBack({ className, style, dataTestId = 'PaymentCard', ...rest }: PaymentCardProps): JSX.Element {
    return (
        <div>
            <div className={backCardCls}>
                <div className={styles.magneticStrip}></div>
                <LittleInput style={{ width: '50%', marginLeft: 'auto' }} />
            </div>
        </div>
    );
}
