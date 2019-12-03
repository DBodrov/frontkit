import classnames from 'classnames';
import React from 'react';
import { DEFAULT_LINK_COLOR } from '../../constants/style';
import { ThemeContext, ThemeTypes } from '../ThemeProvider';
import styles from './BreadCrumbs.module.css';
import { Arrow, ArrowTypes } from '../Arrow';

interface BreadCrumbsProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed in order to change styling */
    className?: string;
    /** Inline style objects passed */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default BreadCrumbs
     * */
    dataTestId?: string;
    /** Array of objects.
     * active - have another style and onClick
     * onClick - function
     * text - text crumb
     * */
    data?: { active: boolean; onClick?: (event: React.MouseEvent<HTMLDivElement>) => void; text: string }[];
}

const getColor = (theme: ThemeTypes, needColor: boolean): string => {
    if (!needColor) {
        return 'inherit';
    }
    if (theme.styles && theme.styles.linkColor) {
        return theme.styles.linkColor;
    }
    return DEFAULT_LINK_COLOR;
};

const getCrumb = (crumb: { active: boolean; text: string }, name: string, dataTestId: string) => {
    const cls = classnames(styles.crumb, { [styles.active]: crumb.active });
    return (
        <div data-testid={dataTestId + '-' + name} className={cls}>
            <span>{crumb.text}</span>
        </div>
    );
};

export function BreadCrumbs(props: BreadCrumbsProps): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const { dataTestId = 'BreadCrumbs', className, style, data: [mainCrumb, secondCrumb, thirdCrumb] = [], ...rest } = props;
    if (!mainCrumb) {
        return <div data-testid="emptyBreadCrumbs" />;
    }
    const clsWrapper = classnames(styles.wrapper, theme.className, className);
    const cls1 = classnames(styles.mainCrumb, { [styles.link]: mainCrumb.active });
    const linkColor = getColor(theme, mainCrumb.active);
    return (
        <div className={clsWrapper} style={style} data-testid={dataTestId} {...rest}>
            <div className={cls1} data-testid={dataTestId + '-mc'} onClick={mainCrumb.active ? mainCrumb.onClick : undefined}>
                {mainCrumb.active && (
                    <Arrow className={styles.vector} dataTestId={dataTestId + '-mc-icon'} color={linkColor} type={ArrowTypes.Left} />
                )}
                <span style={{ color: linkColor }} data-testid={dataTestId + '-mc-text'}>
                    {mainCrumb.text}
                </span>
            </div>
            {secondCrumb && getCrumb(secondCrumb, 'secondCrumb', dataTestId)}
            {thirdCrumb && <Arrow className={styles.vector} dataTestId={dataTestId + '-right'} type={ArrowTypes.Right} />}
            {thirdCrumb && getCrumb(thirdCrumb, 'thirdCrumb', dataTestId)}
        </div>
    );
}
