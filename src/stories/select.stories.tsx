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

const simpleElements = [
    { value: 'Vfufl', onClick: () => console.log('Vfufl') },
    { value: '1', onClick: () => console.log('1') },
    { value: 'sdf', onClick: () => console.log('sdf') },
    { value: 'xcv', onClick: () => console.log('xcv') },
    { value: 'Vfuflasdasd', onClick: () => console.log('Vfuflasdasd') },
    { value: 'Vfuflsdfsdfsfd', onClick: () => console.log('Vfuflsdfsdfsfd') },
];

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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>123</div>
                    <SimpleSelect data={simpleElements} mainText="1" position={SimpleSelectPosition.right} needArrow={true} />
                </div>
            </ThemeProvider>
        ),
        { info: { inline: true } },
    );
