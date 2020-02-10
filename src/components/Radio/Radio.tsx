import classnames from 'classnames';
import React from 'react';
import { StyleTypeProp } from '../Button';
import { ThemeContext } from '../ThemeProvider';
import styles from './Radio.module.css';

interface RadioProps extends React.AllHTMLAttributes<HTMLInputElement> {
    /** Class names passed to Radio in order to change styling */
    className?: string;
    /** Inline style objects passed to Radio */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default Radio
     * */
    dataTestId?: string;
    styleType?: StyleTypeProp;
    value: string;
    name: string;
    label: string;
}

export function Radio(props: RadioProps): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const { name, value, label, dataTestId = 'Radio', className, style, ...rest } = props;
    const themeColor = { background: theme.mainColor };
    const cls = classnames(styles.radio__text, className);
    return (
        <label key={name} className={styles.radio} style={style} data-testid={dataTestId + '-wrap'}>
            <input {...rest} type="radio" name={name} id={value} value={value} data-testid={dataTestId} />
            <div className={cls}>
                <div className={styles.before} data-testid={dataTestId + '-BigCircle'} />
                <span data-testid={dataTestId + '-text'}>{label}</span>
                <div className={styles.after} style={themeColor} data-testid={dataTestId + '-SmallCircle'} />
            </div>
        </label>
    );
}
