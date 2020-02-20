import React from 'react';
import styles from './AccordionDetails.module.css';
import cn from 'classnames';
import { offsetMargin, useInsideBox } from '../Box';

export enum AccordionLineType {
    Header,
    Bold,
    Regular,
    BigMargin,
}

export type Data =
    | {
          type: AccordionLineType.Header;
          value: string;
          dataTestId?: string;
      }
    | { type: AccordionLineType.Bold; name: string; value: string; dataTestId?: string }
    | { type: AccordionLineType.Regular; name: string; value: string; dataTestId?: string }
    | { type: AccordionLineType.BigMargin };

interface DetailsProps {
    data: ReadonlyArray<Data>;
    align?: 'left' | 'right';
    dataTestId?: string;
}

function createLineNumber(n: number): Record<string, number> {
    return {
        msGridRow: n,
    };
}

interface BoldProps {
    name: string;
    value: string;
    dataTestId: string;
    localDataTestId?: string;
    lineNumber: number;
}
function Bold({ name, lineNumber, value, dataTestId, localDataTestId = '' }: BoldProps): JSX.Element {
    const lineStyles = createLineNumber(lineNumber);
    return (
        <>
            <div className={cn(styles.bold, styles.column1)} style={lineStyles} data-testid={localDataTestId + dataTestId + '-name'}>
                {name}
            </div>
            <div
                style={lineStyles}
                className={cn(styles.bold, styles.value, styles.column2)}
                data-testid={localDataTestId + dataTestId + '-value'}
            >
                {value}
            </div>
        </>
    );
}

interface HeaderProps {
    value: string;
    dataTestId: string;
    localDataTestId?: string;
    lineNumber: number;
}
function Header({ lineNumber, value, dataTestId, localDataTestId = '' }: HeaderProps): JSX.Element {
    const lineStyles = createLineNumber(lineNumber);
    return (
        <div style={lineStyles} className={cn(styles.header, styles.fullLine)} data-testid={localDataTestId + dataTestId + '-header'}>
            {value}
        </div>
    );
}

interface RegularProps {
    name: string;
    value: string;
    dataTestId: string;
    localDataTestId?: string;
    lineNumber: number;
}

function Regular({ lineNumber, name, value, dataTestId, localDataTestId = '' }: RegularProps): JSX.Element {
    const lineStyles = createLineNumber(lineNumber);
    return (
        <>
            <div style={lineStyles} className={cn(styles.regular, styles.column1)} data-testid={localDataTestId + dataTestId + '-name'}>
                {name}
            </div>
            <div
                style={lineStyles}
                className={cn(styles.regular, styles.value, styles.column2)}
                data-testid={localDataTestId + dataTestId + '-value'}
            >
                {value}
            </div>
        </>
    );
}

interface BigNumberProps {
    lineNumber: number;
}
function BigMargin({ lineNumber }: BigNumberProps): JSX.Element {
    const lineStyles = createLineNumber(lineNumber);
    return <div style={lineStyles} className={cn(styles.bigMargin, styles.fullLine)} />;
}

export function AccordionDetailsSuccess({ data, align = 'left', dataTestId = 'AccordionDetails' }: DetailsProps): JSX.Element {
    const insideBox = useInsideBox();
    return (
        <div
            className={cn(styles.background, styles.grid, { [styles.right]: align === 'right', [offsetMargin]: insideBox })}
            data-testid={dataTestId}
        >
            {data.map(
                (el, idx): JSX.Element => {
                    switch (el.type) {
                        case AccordionLineType.Header:
                            return (
                                <Header
                                    lineNumber={idx + 1}
                                    localDataTestId={el.dataTestId}
                                    dataTestId={dataTestId}
                                    key={idx}
                                    value={el.value}
                                />
                            );
                        case AccordionLineType.Bold:
                            return (
                                <Bold
                                    lineNumber={idx + 1}
                                    localDataTestId={el.dataTestId}
                                    dataTestId={dataTestId}
                                    key={idx}
                                    name={el.name}
                                    value={el.value}
                                />
                            );
                        case AccordionLineType.Regular:
                            return (
                                <Regular
                                    lineNumber={idx + 1}
                                    localDataTestId={el.dataTestId}
                                    dataTestId={dataTestId}
                                    key={idx}
                                    name={el.name}
                                    value={el.value}
                                />
                            );
                        case AccordionLineType.BigMargin:
                            return <BigMargin lineNumber={idx + 1} key={idx} />;
                    }
                },
            )}
        </div>
    );
}
