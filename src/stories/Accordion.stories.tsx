import React from 'react';
import { Accordion, AccordionLineType, Box } from '..';
import { storiesOf } from '@storybook/react';

const getData: React.ComponentProps<typeof Accordion.Details>['getData'] = () =>
    Promise.resolve([
        {
            type: AccordionLineType.Header,
            value: 'header',
        },
        {
            type: AccordionLineType.Bold,
            name: 'boldTitle',
            value: 'boldValue',
        },
        { type: AccordionLineType.BigMargin },
        {
            type: AccordionLineType.Regular,
            name: 'title',
            value: 'value',
        },
    ]);

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getDelayData = () => sleep(2000).then(getData);

const getDelayError = () => sleep(2000).then(Promise.reject);

const getSimpleData: React.ComponentProps<typeof Accordion.Details>['getData'] = () =>
    Promise.resolve([
        {
            type: AccordionLineType.Regular,
            name: 'title',
            value: 'value',
        },
        {
            type: AccordionLineType.Regular,
            name: 'title',
            value: 'value',
        },
        {
            type: AccordionLineType.Regular,
            name: 'title',
            value: 'value',
        },
        {
            type: AccordionLineType.Regular,
            name: 'title',
            value: 'value',
        },
        {
            type: AccordionLineType.Regular,
            name: 'title',
            value: 'value',
        },
    ]);

storiesOf('Accordion', module)
    .add(
        'simple',
        () => (
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" getData={getData} />
            </>
        ),
        { info: { inline: true } },
    )
    .add(
        'separate pair',
        () => (
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" getData={getData} />

                <Accordion.Link id="test2" />
                <Accordion.Details id="test2" getData={getData} />
            </>
        ),
        { info: { inline: true } },
    )
    .add(
        'right',
        () => (
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" getData={getData} align="right" />
            </>
        ),
        { info: { inline: true } },
    )
    .add(
        'delay',
        () => (
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" getData={getDelayData} align="right" />
            </>
        ),
        { info: { inline: true } },
    )
    .add(
        'delay error',
        () => (
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" getData={getDelayError} align="right" />
            </>
        ),
        { info: { inline: true } },
    )
    .add(
        'inside box',
        () => (
            <Box>
                <div>
                    <Accordion.Link id="test" />
                    <Accordion.Details id="test" getData={getDelayError} align="right" />
                </div>
            </Box>
        ),
        { info: { inline: true } },
    )
    .add(
        'regular lines only',
        () => (
            <Box>
                <div>
                    <Accordion.Link id="test" />
                    <Accordion.Details id="test" getData={getSimpleData} align="right" />
                </div>
            </Box>
        ),
        { info: { inline: true } },
    );
