import React from 'react';
import { Accordion, AccordionLineType } from '..';
import { storiesOf } from '@storybook/react';

const data: React.ComponentProps<typeof Accordion.Details>['data'] = [
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
];

storiesOf('Accordion', module)
    .add(
        'simple',
        () => (
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" data={data} />
            </>
        ),
        { info: { inline: true } },
    )
    .add(
        'separate pair',
        () => (
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" data={data} />

                <Accordion.Link id="test2" />
                <Accordion.Details id="test2" data={data} />
            </>
        ),
        { info: { inline: true } },
    )
    .add(
        'right',
        () => (
            <>
                <Accordion.Link id="test" />
                <Accordion.Details id="test" data={data} align="right" />
            </>
        ),
        { info: { inline: true } },
    );
