import classnames from 'classnames';
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import styles from './BreadCrumbs.module.css';
import { Arrow, ArrowTypes } from '../Arrow';

interface Crumb {
    active: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => unknown;
    text: string;
}

interface BreadCrumbsProps extends React.HTMLAttributes<HTMLElement> {
    /** Class names passed in order to change styling */
    className?: string;
    /** ID attribute for QA Auto-tests
     * @default BreadCrumbs
     * */
    dataTestId?: string;
    /** Array of objects.
     * active - have another style and onClick
     * onClick - function
     * text - text crumb
     * */
    data?: ReadonlyArray<Crumb>;
}

interface CrumbProps {
    crumb: Crumb;
    dataTestId: string;
}

function Crumb({ crumb, dataTestId }: CrumbProps): JSX.Element {
    const cls = classnames(styles.crumb, { [styles.active]: crumb.active });
    return (
        <div data-testid={dataTestId} className={cls}>
            <span data-testid={dataTestId + '-text'}>{crumb.text}</span>
        </div>
    );
}

interface MainCrumbProps {
    crumb: Crumb;
    dataTestId: string;
}
function MainCrumb({ crumb, dataTestId }: MainCrumbProps): JSX.Element {
    const theme = useContext(ThemeContext);
    const cls = classnames(styles.mainCrumb, { [styles.link]: crumb.active });
    const linkColor = crumb.active ? theme.linkColor : 'inherit';
    return (
        <div className={cls} data-testid={dataTestId} onClick={crumb.active ? crumb.onClick : undefined}>
            {crumb.active && <Arrow className={styles.vector} dataTestId={dataTestId + '-icon'} color={linkColor} type={ArrowTypes.Left} />}
            <span style={{ color: linkColor }} data-testid={dataTestId + '-text'}>
                {crumb.text}
            </span>
        </div>
    );
}

export function BreadCrumbs({
    className,
    data: [mainCrumb, secondCrumb, thirdCrumb] = [],
    dataTestId = 'BreadCrumbs',
    ...rest
}: BreadCrumbsProps): JSX.Element {
    if (!mainCrumb) {
        return <div data-testid="emptyBreadCrumbs" />;
    }
    const clsWrapper = classnames(styles.wrapper, className);
    return (
        <div {...rest} className={clsWrapper} data-testid={dataTestId}>
            <MainCrumb crumb={mainCrumb} dataTestId={dataTestId + '-mc'} />
            {secondCrumb && <Crumb crumb={secondCrumb} dataTestId={dataTestId + '-secondCrumb'} />}
            {thirdCrumb && (
                <>
                    <Arrow className={styles.vector} dataTestId={dataTestId + '-right'} color="#A6AAB0" type={ArrowTypes.Right} />
                    <Crumb crumb={thirdCrumb} dataTestId={dataTestId + '-thirdCrumb'} />
                </>
            )}
        </div>
    );
}
