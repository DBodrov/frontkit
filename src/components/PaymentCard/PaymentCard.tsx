import classnames from 'classnames';
import React, { Component } from 'react';

import { isInvalidInput, validate } from './validators';
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
    /** array of bank images */
    images?: Array<{ url: string; name: string }>;
}

const frontCardCls = classnames(styles.cardWrapper, styles.frontCard);
const backCardCls = classnames(styles.cardWrapper, styles.backCard);
const cvvCls = classnames(styles.mb10, styles.cvv);

const form = {
    exp: '',
    cvv: '',
    name: '',
    ccNumber: '',
};

const error = {
    'cc-number': false,
    'cc-name': false,
    'cc-exp': false,
    'cc-csc': false,
};

const LittleInput = (props: any) => <SmallInput background={props.error ? BackgroundProp.Error : BackgroundProp.White} {...props} />;

export function PaymentCard({ className, style, dataTestId = 'PaymentCard', images, ...rest }: PaymentCardProps): JSX.Element {
    return (
        <div className={frontCardCls}>
            <div>{images && images.map(image => <img src={image.url} alt={image.name} />)}</div>
            <div>
                <LittleInput
                    name="cc-number"
                    placeholder="Номер карты"
                    className={styles.mb10}
                    error={error['cc-number']}
                    autoComplete="cc-number"
                />
                {console.log(error, 2)}
                <div className={styles.flex}>
                    <LittleInput
                        name="cc-name"
                        placeholder="Владелец карты"
                        className={styles.ccName}
                        error={error['cc-name']}
                        autoComplete="cc-name"
                    />
                    <LittleInput name="cc-exp" placeholder="ММ/ГГ" maxLength="5" error={error['cc-exp']} autoComplete="cc-exp" />
                </div>
            </div>
        </div>
    );
}

function PaymentCardBack({ className, style, dataTestId = 'PaymentCard', ...rest }: PaymentCardProps): JSX.Element {
    return (
        <div className={backCardCls}>
            <div className={styles.magneticStrip}></div>
            <div className={styles.backCardBlock}>
                <LittleInput
                    name="cc-csc"
                    type="text"
                    placeholder="CVV/CVC"
                    className={cvvCls}
                    maxLength="3"
                    error={error['cc-csc']}
                    autoComplete="cc-csc"
                />
                <div className={styles.cardText}>Последние 3 цифры на оборотной стороне карты</div>
            </div>
        </div>
    );
}

export class PaymentCards extends Component {
    handleFormChange = event => {
        const { name, value } = event.target;
        const element = event.target;

        if (isInvalidInput(name, value)) {
            element.value = form[name];
            return;
        }

        // const elementSelection = element.selectionStart;
        // let elementNextSelection = element.selectionStart;
        // const prev = form[name].replace(/\s/g, '').length;
        // const cur = value.replace(/\s/g, '').length;

        // switch (event.target.name) {
        //     case 'ccn':
        //         if (cur >= prev) {
        //             if (elementSelection % 5 === 0) {
        //                 elementNextSelection += 1;
        //             }
        //         }
        //         break;
        //     case 'exp':
        //         if (cur >= prev) {
        //             if (elementSelection === 3) {
        //                 elementNextSelection += 1;
        //             }
        //         }
        //         break;
        //     default:
        //         break;
        // }

        element.value = format(name, value);
        error[name] = !validate(name, element.value);
        form[name] = element.value;
        // element.setSelectionRange(elementNextSelection, elementNextSelection);
    };

    render() {
        const { className, style, dataTestId = 'PaymentCard', ...rest }: PaymentCardProps = this.props;
        return (
            <div className={styles.wrapper}>
                <div className={styles.cardsWrapper} onChange={this.handleFormChange}>
                    <PaymentCard />
                    <PaymentCardBack />
                </div>
            </div>
        );
    }
}
