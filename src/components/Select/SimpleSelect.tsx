import React, { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useClickOutside } from '../../hooks/useClickOutsideSelect';
import { Arrow, ArrowTypes } from '../Arrow';
import { LinkWrapper } from '../LinkWrapper';
import { SelectItemsWrapper } from './Select';
import styles from './SimpleSelect.module.css';
import cn from 'classnames';

export enum SimpleSelectPosition {
    left,
    right,
}

type SimpleSelectProps = {
    mainText: ReactNode;
    data: { value: string; onClick: () => void }[];
    className?: string;
    needArrow?: boolean;
    position?: SimpleSelectPosition;
    dataTestId?: string;
    countToShowElements?: number;
};

export const SimpleSelect = ({
    mainText,
    data,
    needArrow = true,
    className,
    position = SimpleSelectPosition.right,
    dataTestId = 'SimpleSelect',
    countToShowElements = 4,
}: SimpleSelectProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const scrollbar = React.useRef<Scrollbars>(null);
    const handleClick = React.useCallback(() => setIsOpen(o => !o), [setIsOpen]);
    const handleClickOutside = React.useCallback(() => setIsOpen(false), [setIsOpen]);
    const elements = React.useMemo(
        () =>
            data.map(el => (
                <LinkWrapper key={el.value} dataTestId={el.value} onClick={el.onClick} className={styles.element}>
                    {el.value}
                </LinkWrapper>
            )),
        [data],
    );
    useClickOutside(wrapperRef, handleClickOutside);
    return (
        <div
            ref={wrapperRef}
            data-testid={dataTestId + '-wrapper'}
            className={cn(className, styles.select)}
            style={{ position: 'relative' }}
        >
            <div
                className={cn(styles.head, { [styles.rightFlex]: position === SimpleSelectPosition.right })}
                onClick={handleClick}
                data-testid={dataTestId}
            >
                <div className={styles.mainText}>{mainText}</div>
                {needArrow && (
                    <Arrow
                        dataTestId={dataTestId + '-arrow'}
                        type={isOpen ? ArrowTypes.Up : ArrowTypes.Down}
                        className={styles.arrow}
                        color="black"
                    />
                )}
            </div>
            {isOpen && (
                <SelectItemsWrapper
                    className={position === SimpleSelectPosition.right ? styles.right : ''}
                    countToShowElements={countToShowElements}
                    scrollbar={scrollbar}
                    changeWidth
                >
                    {elements}
                </SelectItemsWrapper>
            )}
        </div>
    );
};
