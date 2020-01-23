import classnames from 'classnames';
import React from 'react';
import { ThemeContext, ThemeTypes } from '../ThemeProvider';
import styles from './Checkbox.module.css';
import { HelpIcon } from '../Input';

interface CheckboxProps extends React.HTMLAttributes<HTMLElement> {
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
    label?: string;
    /** ID attribute to change styling
     * @default Checkbox
     * */
    id?: string;
}

const getFinalStyles = (theme: ThemeTypes) => {
    if (!theme.styles || !theme.styles.mainColor) {
        return undefined;
    }
    const { mainColor } = theme.styles;
    return { background: mainColor };
};

export function Checkbox(props: CheckboxProps): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const { dataTestId = 'Checkbox', className, style, label, id = 'Checkbox', hintText, ...rest } = props;
    const finalStyles = getFinalStyles(theme);
    const needHint = hintText && hintText.length > 0;
    const cls = classnames(styles.checkboxWrapper, { [styles.cf]: needHint }, theme.className, className);
    return (
        <div className={cls} style={style}>
            <input {...rest} type="checkbox" id={id} className={styles.checkbox} data-testid={dataTestId} />
            <label htmlFor={id} className={styles.label} data-testid={dataTestId + '-label'}>
                <div className={styles.bigBox} data-testid={dataTestId + '-bigBox'}>
                    <div className={styles.smallBox} style={finalStyles} data-testid={dataTestId + '-smallBox'} />
                </div>
                {label && (
                    <span className={styles.labelText} data-testid={dataTestId + '-label-text'}>
                        {label}
                    </span>
                )}
            </label>
            {needHint && <HelpIcon checkbox text={hintText} dataTestId={dataTestId + '-intText'} />}
        </div>
    );
}
