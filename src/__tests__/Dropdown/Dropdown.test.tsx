import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Dropdown } from '../..';

const data = ['123', '12321312', '789', '123213'];

describe('dropdown', () => {
    const mockFunc = jest.fn();
    test('should render an Dropdown element', () => {
        const dataTestId = ';j3eqw;l;lqw';
        const { getByTestId } = render(
            <Dropdown
                data={['123']}
                value="123"
                showDimmer={true}
                getElement={_ => <div style={{ padding: '25px 30px' }}>{_}</div>}
                inputThreshold={1}
                resultThreshold={2}
                onChangeInput={mockFunc}
                getKeyCode={mockFunc}
                onSelect={mockFunc}
                clickOutSide={mockFunc}
                dataTestId={dataTestId}
                onFocus={mockFunc}
            />,
        );
        expect(() => getByTestId(dataTestId)).not.toThrow();
        expect(() => getByTestId(dataTestId + '-loading')).toThrow();
        expect(() => getByTestId(dataTestId + '-not-found')).toThrow();
        expect(() => getByTestId(dataTestId + '-data')).not.toThrow();
    });

    test('should have default dataTestId', () => {
        const dataTestId = 'dropdown';
        const { getByTestId } = render(
            <Dropdown
                data={data}
                value="123"
                loading={true}
                showDimmer={true}
                getElement={_ => <div style={{ padding: '25px 30px' }}>{_}</div>}
                inputThreshold={1}
                resultThreshold={2}
                onChangeInput={mockFunc}
                getKeyCode={mockFunc}
                onSelect={mockFunc}
                clickOutSide={mockFunc}
                onFocus={mockFunc}
            />,
        );
        expect(() => getByTestId(dataTestId)).not.toThrow();
        expect(() => getByTestId(dataTestId + '-loading')).not.toThrow();
    });

    test('should no have items', () => {
        const dataTestId = 'dropdown';
        const { getByTestId } = render(
            <Dropdown
                data={[]}
                value="123"
                getElement={_ => <div style={{ padding: '25px 30px' }}>{_}</div>}
                inputThreshold={1}
                resultThreshold={2}
                onChangeInput={mockFunc}
                getKeyCode={mockFunc}
                onSelect={mockFunc}
                clickOutSide={mockFunc}
                dataTestId={dataTestId}
                onFocus={mockFunc}
            />,
        );
        expect(() => getByTestId(dataTestId)).not.toThrow();
        expect(() => getByTestId(dataTestId + '-data')).toThrow();
    });
    test('should have not-found', () => {
        const dataTestId = 'dropdown';
        const { getByTestId } = render(
            <Dropdown
                data={[]}
                value="123"
                loading={false}
                showDimmer={true}
                getElement={_ => <div style={{ padding: '25px 30px' }}>{_}</div>}
                inputThreshold={1}
                resultThreshold={2}
                onChangeInput={mockFunc}
                getKeyCode={mockFunc}
                onSelect={mockFunc}
                clickOutSide={mockFunc}
                dataTestId={dataTestId}
                onFocus={mockFunc}
            />,
        );
        expect(() => getByTestId(dataTestId)).not.toThrow();
        expect(() => getByTestId(dataTestId + '-data')).toThrow();
        expect(() => getByTestId(dataTestId + '-not-found')).not.toThrow();
    });
});

describe('states', () => {
    const mockFunc = jest.fn();
    test('should click', () => {
        const dataTestId = ';j3eqw;l;lqw';
        const clickHandler = jest.fn();
        const changeHandler = jest.fn();
        const { container, getByTestId } = render(
            <Dropdown
                data={data}
                value="123"
                loading={false}
                showDimmer={true}
                getElement={_ => (
                    <div data-testid={_} style={{ padding: '25px 30px' }}>
                        {_}
                    </div>
                )}
                inputThreshold={1}
                resultThreshold={2}
                onChangeInput={changeHandler}
                getKeyCode={changeHandler}
                onSelect={clickHandler}
                clickOutSide={mockFunc}
                dataTestId={dataTestId}
                onFocus={mockFunc}
            />,
        );
        const ddElement = getByTestId(data[0]);
        expect(ddElement).not.toBeNull();

        fireEvent.click(ddElement);
        expect(clickHandler).toBeCalledTimes(1);

        const input = container.querySelector('input');
        expect(input).not.toBeNull();
        fireEvent.change(input as Element, { target: { value: '41111' } });
        fireEvent.keyDown(input as Element, { key: 'Enter', code: 13 });
        fireEvent.keyDown(input as Element, { key: 'ArrowDown', code: 40 });
        fireEvent.keyDown(input as Element, { key: 'ArrowUp', code: 38 });
        fireEvent.keyDown(input as Element, { key: '0', code: 96 });
        expect(changeHandler).toBeCalledTimes(4);
    });
});
