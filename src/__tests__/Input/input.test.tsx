import { render } from '@testing-library/react';
import * as React from 'react';
import { Input, ErrorIcon } from '../../components/Input';

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

describe('icons', () => {
    test('should render icon', () => {
        const errorTestId = 'input-error-icon';
        const { getByTestId } = render(<Input Icon={ErrorIcon} />);
        expect(getByTestId(errorTestId)).not.toBeNull();
    });

    test('can change data-testid in icon', () => {
        const errorTestId = 'kljdaskljdaskjdkjas';
        const { getByTestId } = render(<Input Icon={() => <ErrorIcon dataTestId={errorTestId} />} />);
        expect(getByTestId(errorTestId)).not.toBeNull();
    });
});
