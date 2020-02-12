import React from 'react';
import styles from './AccordionDetails.module.css';
import cn from 'classnames';

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

interface BoldProps {
    name: string;
    value: string;
    dataTestId: string;
    localDataTestId?: string;
}
function Bold({ name, value, dataTestId, localDataTestId = '' }: BoldProps): JSX.Element {
    return (
        <>
            <div className={styles.bold} data-testid={localDataTestId + dataTestId + '-name'}>
                {name}
            </div>
            <div className={cn(styles.bold, styles.value)} data-testid={localDataTestId + dataTestId + '-value'}>
                {value}
            </div>
        </>
    );
}

interface HeaderProps {
    value: string;
    dataTestId: string;
    localDataTestId?: string;
}
function Header({ value, dataTestId, localDataTestId = '' }: HeaderProps): JSX.Element {
    return (
        <div className={cn(styles.header, styles.fullLine)} data-testid={localDataTestId + dataTestId + '-header'}>
            {value}
        </div>
    );
}

interface RegularProps {
    name: string;
    value: string;
    dataTestId: string;
    localDataTestId?: string;
}

function Regular({ name, value, dataTestId, localDataTestId = '' }: RegularProps): JSX.Element {
    return (
        <>
            <div className={styles.regular} data-testid={localDataTestId + dataTestId + '-name'}>
                {name}
            </div>
            <div className={cn(styles.regular, styles.value)} data-testid={localDataTestId + dataTestId + '-value'}>
                {value}
            </div>
        </>
    );
}

function BigMargin(): JSX.Element {
    return <div className={cn(styles.bigMargin, styles.fullLine)} />;
}

export function AccordionDetailsSuccess({ data, align = 'left', dataTestId = 'AccordionDetails' }: DetailsProps): JSX.Element {
    return (
        <div className={cn(styles.background, styles.grid, { [styles.right]: align === 'right' })} data-testid={dataTestId}>
            {data.map(
                (el, idx): JSX.Element => {
                    switch (el.type) {
                        case AccordionLineType.Header:
                            return <Header localDataTestId={el.dataTestId} dataTestId={dataTestId} key={idx} value={el.value} />;
                        case AccordionLineType.Bold:
                            return (
                                <Bold localDataTestId={el.dataTestId} dataTestId={dataTestId} key={idx} name={el.name} value={el.value} />
                            );
                        case AccordionLineType.Regular:
                            return (
                                <Regular
                                    localDataTestId={el.dataTestId}
                                    dataTestId={dataTestId}
                                    key={idx}
                                    name={el.name}
                                    value={el.value}
                                />
                            );
                        case AccordionLineType.BigMargin:
                            return <BigMargin key={idx} />;
                    }
                },
            )}
        </div>
    );
}
