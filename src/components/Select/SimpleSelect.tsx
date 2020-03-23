import React, { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useClickOutside } from '../../hooks/useClickOutsideSelect';
import { Arrow, ArrowTypes } from '../Arrow';
import { SelectItemsWrapper } from './Select';
import styles from './SimpleSelect.module.css';
import cn from 'classnames';

export enum SimpleSelectPosition {
    left,
    right,
}

type SimpleSelectProps = {
    mainText: ReactNode;
    elements: ReactNode;
    className?: string;
    needArrow?: boolean;
    position?: SimpleSelectPosition;
    dataTestId?: string;
};

export const SimpleSelect = ({
    mainText,
    elements,
    needArrow = true,
    className,
    position = SimpleSelectPosition.right,
    dataTestId = 'SimpleSelect',
}: SimpleSelectProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const scrollbar = React.useRef<Scrollbars>(null);
    const handleClick = React.useCallback(() => setIsOpen(o => !o), [setIsOpen]);
    const handleClickOutside = React.useCallback(() => setIsOpen(false), [setIsOpen]);
    useClickOutside(wrapperRef, handleClickOutside);
    return (
        <div ref={wrapperRef} data-testid={dataTestId + '-wrapper'} className={className} style={{ position: 'relative' }}>
            <div
                className={cn(styles.head, { [styles.rightFlex]: position === SimpleSelectPosition.right })}
                onClick={handleClick}
                data-testid={dataTestId}
            >
                {mainText}
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
                    countToShowElements={2}
                    scrollbar={scrollbar}
                    changeWidth
                >
                    {elements}
                </SelectItemsWrapper>
            )}
        </div>
    );
};
