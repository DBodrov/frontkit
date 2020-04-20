import classnames from 'classnames';
import React from 'react';
import { ThemeContext } from '../ThemeProvider';
import styles from './Checkbox.module.css';
import { HelpIcon } from '../Input';

interface CheckboxProps extends React.AllHTMLAttributes<HTMLInputElement> {
    /** Class names passed in order to change styling */
    className?: string;
    /** Inline style objects passed */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default Button
     * */
    dataTestId?: string;
    hintText?: string;
    /** Description of checkbox */
    Label?: React.FunctionComponent | string;
    /** ID attribute to change styling
     * @default Checkbox
     * */
    id?: string;
}
export function Checkbox(props: CheckboxProps): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const { dataTestId = 'Checkbox', className, style, Label, id = 'Checkbox', hintText = '', ...rest } = props;
    const finalStyles = { background: theme.mainColor };
    const needHint = hintText.length > 0;
    const cls = classnames(styles.checkboxWrapper, { [styles.cf]: needHint }, className);
    return (
        <div className={cls} style={style}>
            <input {...rest} type="checkbox" id={id} className={styles.checkbox} data-testid={dataTestId} />
            <label htmlFor={id} className={styles.label} data-testid={dataTestId + '-label'}>
                <div className={styles.bigBox} data-testid={dataTestId + '-bigBox'}>
                    <div className={styles.smallBox} style={finalStyles} data-testid={dataTestId + '-smallBox'} />
                </div>
                {Label && (
                    <span className={styles.labelText} data-testid={dataTestId + '-label-text'}>
                        {typeof Label === 'string' ? Label : <Label />}
                    </span>
                )}
            </label>
            {needHint && <HelpIcon text={hintText} dataTestId={dataTestId + '-intText'} />}
        </div>
    );
}
