import { render } from '@testing-library/react';
import * as React from 'react';
import { Input, ErrorIcon, BackgroundProp, SuccessIcon } from '../../components/Input';

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
