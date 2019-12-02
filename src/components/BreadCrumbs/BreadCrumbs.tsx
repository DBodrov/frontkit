import classnames from 'classnames';
import React from 'react';
import { ThemeContext, ThemeTypes } from '../ThemeProvider';
import styles from './BreadCrumbs.module.css';
import { Arrow, ArrowTypes } from './Icons';

const getColor = (theme: ThemeTypes, needColor = false) => {
    if (!needColor) {
        return '';
    }
    if (theme.styles && theme.styles.linkColor) {
        return theme.styles.linkColor;
    }
    return '#4B8BDA';
};

export function BreadCrumbs(props): JSX.Element {
    const theme = React.useContext(ThemeContext);
    const { children, dataTestId = 'BreadCrumbs', className, style, data: [mainCrumb, secondCrumb, thirdCrumb] = [], ...rest } = props;
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
                    className={classnames(styles.crumb, { [styles.active]: secondCrumb.active })}
                    onClick={secondCrumb.active ? secondCrumb.onClick : undefined}
                >
                    <span>{secondCrumb.text}</span>
                </div>
            )}
            {thirdCrumb && <Arrow className={styles.vector} dataTestId={dataTestId + '-right-icon'} type={ArrowTypes.Right} />}
            {thirdCrumb && (
                <div
                    className={classnames(styles.crumb, { [styles.active]: thirdCrumb.active })}
                    onClick={thirdCrumb.active ? thirdCrumb.onClick : undefined}
                >
                    <span>{thirdCrumb.text}</span>
                </div>
            )}
        </div>
    );
}
