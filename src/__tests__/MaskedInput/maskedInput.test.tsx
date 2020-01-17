import { render } from '@testing-library/react';
import React from 'react';
import { MaskedInput } from '../../components/MaskedInput';

describe('input', () => {
    test('should render input element', () => {
        const { container } = render(<MaskedInput mask="+7 (999) 999 99 99" />);
        expect(container.getElementsByTagName('input').length).toBe(1);
    });

    test('should render placeholder', () => {
        const placeholder = 'placeholder1231231';
        const { getByPlaceholderText } = render(<MaskedInput mask="+7 (999) 999 99 99" placeholder={placeholder} />);
        expect(getByPlaceholderText(placeholder)).not.toBeNull();
    });
});
