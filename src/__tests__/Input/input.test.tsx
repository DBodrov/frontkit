import { render } from '@testing-library/react';
import * as React from 'react';
import { Input } from '../../components/Input';

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
