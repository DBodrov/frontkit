import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Select } from '../../components/Select';
import { ElementTypes } from '../../components/Select/Select';

const elements: ElementTypes[] = [
    { name: '1', value: 'Vfufl' },
    { name: '2', value: 'JKHsdkjbdfgjknsdf' },
    { name: '3', value: 'jknfdv.njk' },
    { name: '4', value: '44' },
    { name: '5', value: '55' },
    { name: '6', value: '66' },
];

describe('Select', () => {
    test('should render an Select element', () => {
        const dataTestId = ';j3eqw;l;lqw';
        const { getByTestId } = render(
            <Select elements={elements} name="select" dataTestId={dataTestId}/>,
        );
        expect(() => getByTestId(dataTestId)).not.toThrow();
    });

    test('should have default dataTestId', () => {
        const dataTestId = 'Select';
        const { getByTestId } = render(
            <Select elements={elements} name="select"/>,
        );
        expect(() => getByTestId(dataTestId)).not.toThrow();
    });
});

describe('Select change', () => {
    test('should render an Select elements and changing', () => {
        const dataTestId = 'fdssdfv';
        const { getByTestId, getByPlaceholderText } = render(
            <Select small countToShowElements={4} defaultId='1' elements={elements} name="select" dataTestId={dataTestId} placeholder="123"/>,
        );
        const select = getByTestId(dataTestId + '-input');
        expect(() => select).not.toThrow();
        expect(getByPlaceholderText("123")).not.toBeNull();
        fireEvent.focus(select);
        expect(() => getByTestId('ScrollbarsView')).not.toThrow();
    });
});

