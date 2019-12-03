import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Input, ErrorIcon, BackgroundProp, SuccessIcon, SearchIcon } from '../../components/Input';

describe('input', () => {
    test('should render input element', () => {
        const { container } = render(<Input />);
        expect(container.getElementsByTagName('input').length).toBe(1);
    });

    test('should render placeholder', () => {
        const placeholder = 'placeholder1231231';
        const { getByPlaceholderText } = render(<Input placeholder={placeholder} />);
        expect(getByPlaceholderText(placeholder)).not.toBeNull();
    });
});

describe('right icons', () => {
    test('should render error icon', () => {
        const errorTestId = 'input-error-icon';
        const { getByTestId } = render(<Input RightIcon={ErrorIcon} />);
        expect(getByTestId(errorTestId)).not.toBeNull();
    });

    test('can change data-testid in error icon', () => {
        const errorTestId = 'kljdaskljdaskjdkjas';
        const { getByTestId } = render(<Input RightIcon={() => <ErrorIcon dataTestId={errorTestId} />} />);
        expect(getByTestId(errorTestId)).not.toBeNull();
    });

    test('should render success icon', () => {
        const successTestId = 'input-success-icon';
        const { getByTestId } = render(<Input RightIcon={SuccessIcon} />);
        expect(getByTestId(successTestId)).not.toBeNull();
    });

    test('can change data-testid in success icon', () => {
        const successTestId = 'dfasbkjvcbn';
        const { getByTestId } = render(<Input RightIcon={() => <SuccessIcon dataTestId={successTestId} />} />);
        expect(getByTestId(successTestId)).not.toBeNull();
    });
});

describe('left icons', () => {
    test('should render search icon', () => {
        const searchTestId = 'input-search-icon';
        const { getByTestId } = render(<Input LeftIcon={SearchIcon} />);
        expect(getByTestId(searchTestId)).not.toBeNull();
    });
    test('can change data-testid in search icon', () => {
        const searchTestId = '123213asda';
        const { getByTestId } = render(<Input LeftIcon={() => <SearchIcon dataTestId={searchTestId} />} />);
        expect(getByTestId(searchTestId)).not.toBeNull();
    });
});

describe('focus', () => {
    test('should focus on click of left element', () => {
        const dataTestId = '123asdasda';
        const { getByTestId } = render(<Input dataTestId={dataTestId} />);

        const leftPart = getByTestId(dataTestId + '-left');
        const inputPart = getByTestId(dataTestId + '-input');

        fireEvent.click(leftPart);
        expect(document.activeElement).toBe(inputPart);
    });

    test('should focus on click of right element', () => {
        const dataTestId = '123asdasda';
        const { getByTestId } = render(<Input dataTestId={dataTestId} />);

        const rightPart = getByTestId(dataTestId + '-right');
        const inputPart = getByTestId(dataTestId + '-input');

        fireEvent.click(rightPart);
        expect(document.activeElement).toBe(inputPart);
    });

    test('should loose focus on click ouside', () => {
        const dataTestId = '123asdasda';
        const outsideTestId = 'outside';
        const { getByTestId } = render(
            <>
                <Input dataTestId={dataTestId} />
                <div data-testid={outsideTestId} />
            </>,
        );

        const inputPart = getByTestId(dataTestId + '-input');
        const outside = getByTestId(outsideTestId);

        fireEvent.focus(inputPart);
        expect(document.activeElement).toBe(inputPart);
        fireEvent.click(outside);
        expect(document.activeElement).not.toBe(inputPart);
    });
});

describe('colors', () => {
    test('should be red if error', () => {
        const { container } = render(<Input background={BackgroundProp.Error} />);
        expect(container.getElementsByTagName('input')[0].className).toMatch(/error/);
    });
    test('should be green if success', () => {
        const { container } = render(<Input background={BackgroundProp.Success} />);
        expect(container.getElementsByTagName('input')[0].className).toMatch(/success/);
    });
});
