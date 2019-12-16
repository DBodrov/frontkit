import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Dropdown } from '../..';

function assert(condition: unknown): asserts condition {
    if (!condition) {
        throw new Error();
    }
}

const data = ['123', '12321312', '789', '123213'];
function getElement(el: string): JSX.Element {
    return <p>{el}</p>;
}
function isSuitable(el: string, input: string): boolean {
    return el.includes(input);
}

describe('dropdown', () => {
    test('should render an Dropdown element', () => {
        const dataTestId = ';j3eqw;l;lqw';
        const { getByTestId } = render(
            <Dropdown
                dataTestId={dataTestId}
                data={data}
                resultThreshold={1}
                inputThreshold={2}
                getElement={getElement}
                isSuitable={isSuitable}
            />,
        );
        expect(() => getByTestId(dataTestId)).not.toThrow();
    });

    test('should have default dataTestId', () => {
        const dataTestId = 'dropdown';
        const { getByTestId } = render(
            <Dropdown
                dataTestId={dataTestId}
                data={data}
                resultThreshold={1}
                inputThreshold={2}
                getElement={getElement}
                isSuitable={isSuitable}
            />,
        );
        expect(() => getByTestId(dataTestId)).not.toThrow();
    });
});

describe('states', () => {
    test('should show "not found" state if any element is not suitable for input', () => {
        const dataTestId = ';j3eqw;l;lqw';
        const { container, getByTestId } = render(
            <Dropdown
                dataTestId={dataTestId}
                data={data}
                resultThreshold={1}
                inputThreshold={2}
                getElement={getElement}
                isSuitable={isSuitable}
            />,
        );
        const input = container.querySelector('input');
        expect(input).not.toBeNull();
        assert(input);

        fireEvent.change(input, { target: { value: 'hahdasdhj' } });
        expect(() => getByTestId(dataTestId + '-not-found')).not.toThrow();
    });

    test('should show elements if input size more than threshold', () => {
        const dataTestId = ';j3eqw;l;lqw';
        const { container, getByTestId } = render(
            <Dropdown
                dataTestId={dataTestId}
                data={data}
                resultThreshold={1}
                inputThreshold={2}
                getElement={getElement}
                isSuitable={isSuitable}
            />,
        );
        const input = container.querySelector('input');
        expect(input).not.toBeNull();
        assert(input);

        fireEvent.change(input, { target: { value: '123' } });
        expect(() => getByTestId(dataTestId + '-data')).not.toThrow();
        expect(() => getByTestId(dataTestId + '-data-more')).not.toThrow();
        expect(() => getByTestId(dataTestId + '-dimmer')).not.toThrow();
    });

    test('should show elements without "more"', () => {
        const dataTestId = ';j3eqw;l;lqw';
        const { container, getByTestId } = render(
            <Dropdown
                dataTestId={dataTestId}
                data={data}
                resultThreshold={10}
                inputThreshold={2}
                getElement={getElement}
                isSuitable={isSuitable}
            />,
        );
        const input = container.querySelector('input');
        expect(input).not.toBeNull();
        assert(input);

        fireEvent.change(input, { target: { value: '789' } });
        expect(() => getByTestId(dataTestId + '-data')).not.toThrow();
        expect(() => getByTestId(dataTestId + '-data-more')).toThrow();
        expect(() => getByTestId(dataTestId + '-dimmer')).not.toThrow();
    });
});
