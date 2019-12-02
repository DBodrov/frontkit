import classnames from 'classnames';
import React from 'react';
import { ThemeContext, ThemeTypes } from '../ThemeProvider';
import styles from './BreadCrumbs.module.css';
import { Arrow, ArrowTypes } from './Icons';

interface BreadCrumbsProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed in order to change styling */
    className?: string;
    /** Inline style objects passed */
    style?: React.StyleHTMLAttributes<HTMLElement>;
    /** ID attribute for QA Auto-tests
     * @default BreadCrumbs
     * */
    dataTestId?: string;
    data?: { active: boolean; onClick: (event: React.MouseEvent<HTMLDivElement>) => void; text: string }[];
}

const getColor = (theme: ThemeTypes, needColor: boolean): string => {
    if (!needColor) {
        return 'inherit';
    }
    if (theme.styles && theme.styles.linkColor) {
        return theme.styles.linkColor;
    }
    return '#4B8BDA';
};

export function BreadCrumbs(props: BreadCrumbsProps): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const { dataTestId = 'BreadCrumbs', className, style, data: [mainCrumb, secondCrumb, thirdCrumb] = [], ...rest } = props;
    if (!mainCrumb) {
        return <div data-testid="emptyBreadCrumbs" />;
    }
    const clsWrapper = classnames(styles.wrapper, theme.className, className);
    const clsMainPage = classnames(styles.mainCrumb, { [styles.active]: mainCrumb.active });
    const linkColor = getColor(theme, mainCrumb.active);
    return (
        <div className={clsWrapper} style={style} data-testid={dataTestId} {...rest}>
            {mainCrumb && (
                <div className={clsMainPage} data-testid={dataTestId + '-mc'} onClick={mainCrumb.active ? mainCrumb.onClick : undefined}>
                    {mainCrumb.active && (
                        <Arrow className={styles.vector} dataTestId={dataTestId + '-mc-icon'} color={linkColor} type={ArrowTypes.Left} />
                    )}
                    <span style={{ color: linkColor }} data-testid={dataTestId + '-mc-text'}>
                        {mainCrumb.text}
                    </span>
                </div>
            )}
            {secondCrumb && (
                <div
                    data-testid={dataTestId + '-2'}
                    className={classnames(styles.crumb, { [styles.active]: secondCrumb.active })}
                    onClick={secondCrumb.active ? secondCrumb.onClick : undefined}
                >
                    <span>{secondCrumb.text}</span>
                </div>
            )}
            {thirdCrumb && <Arrow className={styles.vector} dataTestId={dataTestId + '-right'} type={ArrowTypes.Right} />}
            {thirdCrumb && (
                <div
                    data-testid={dataTestId + '-3'}
                    className={classnames(styles.crumb, { [styles.active]: thirdCrumb.active })}
                    onClick={thirdCrumb.active ? thirdCrumb.onClick : undefined}
                >
                    <span>{thirdCrumb.text}</span>
                </div>
            )}
        </div>
    );
}
