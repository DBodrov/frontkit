import classnames from 'classnames';
import React from 'react';
import styles from './BreadCrumbs.module.css';
import { Arrow, ArrowTypes } from '../Arrow';
import { LinkWrapper } from '../LinkWrapper';

interface Crumb {
    active: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    href?: string;
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
    RightComponent?: React.ComponentType;
    RegionsComponent?: React.ComponentType;
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
    const cls = classnames(styles.mainCrumb, { [styles.link]: crumb.active });
    return (
        <>
            {crumb.active && (
                <LinkWrapper className={cls} dataTestId={dataTestId}>
                    <a data-testid={dataTestId + '-text'} onClick={crumb.onClick}>
                        {crumb.text}
                    </a>
                </LinkWrapper>
            )}
            {!crumb.active && (
                <div className={cls} data-testid={dataTestId}>
                    <span data-testid={dataTestId + '-text'}>{crumb.text}</span>
                </div>
            )}
        </>
    );
}

export function BreadCrumbs({
    className,
    data: [mainCrumb, secondCrumb, thirdCrumb] = [],
    dataTestId = 'BreadCrumbs',
    RightComponent,
    RegionsComponent,
    ...rest
}: BreadCrumbsProps): JSX.Element {
    if (!mainCrumb) {
        return <div data-testid="emptyBreadCrumbs" />;
    }
    const clsWrapper = classnames(styles.wrapper, className, { [styles.regionMode]: Boolean(RegionsComponent) });
    return (
        <div {...rest} className={clsWrapper} data-testid={dataTestId}>
            <MainCrumb crumb={mainCrumb} dataTestId={dataTestId + '-mc'} />
            <div className={styles.otherCrumb}>
                {secondCrumb && <Crumb crumb={secondCrumb} dataTestId={dataTestId + '-secondCrumb'} />}
                {thirdCrumb && (
                    <>
                        <Arrow className={styles.vector} dataTestId={dataTestId + '-right'} color="#A6AAB0" type={ArrowTypes.Right} />
                        <Crumb crumb={thirdCrumb} dataTestId={dataTestId + '-thirdCrumb'} />
                    </>
                )}
            </div>
            {RegionsComponent && (
                <div className={styles.regions}>
                    <RegionsComponent />
                </div>
            )}
            <div className={styles.rightComponent}>{RightComponent && <RightComponent />}</div>
        </div>
    );
}
