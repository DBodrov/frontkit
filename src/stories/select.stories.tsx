import { storiesOf } from '@storybook/react';
import React from 'react';
import { Select, SimpleSelect, SimpleSelectPosition } from '../components/Select';
import { ElementTypes } from '../components/Select/Select';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    linkColor: '#8000ff',
};

const elements: ElementTypes[] = [
    { name: '1', value: 'Vfufl' },
    { name: '2', value: 'JKHsdkjbdfgjknsdf' },
    { name: '3', value: 'jknfdv.njk' },
    { name: '4', value: '44' },
    { name: '5', value: '55' },
    { name: '6', value: '66' },
];

const simpleElements = [<div key="ewr">234234</div>, <div key="ew2r">1233454</div>];

storiesOf('Select', module)
    .add(
        'Select',
        () => (
            <ThemeProvider value={theme}>
                <Select elements={elements} name="12sdf34" />
            </ThemeProvider>
        ),
        { info: { inline: true } },
    )
    .add(
        'SimpleSelect',
        () => (
            <ThemeProvider value={theme}>
                <SimpleSelect elements={simpleElements} mainText="kdjfgbhkdfj" position={SimpleSelectPosition.right} needArrow={true} />
            </ThemeProvider>
        ),
        { info: { inline: true } },
    );
