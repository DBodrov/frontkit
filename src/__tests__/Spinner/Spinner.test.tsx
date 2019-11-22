import React from 'react';
import { render } from '@testing-library/react';

import { Spinner } from '../../components/Spinner';

describe('<Spinner />', () => {
    const spinnerTestId = 'Spinnnner';

    test('should spinner rendered', () => {
        const { getByTestId } = render(<Spinner dataTestId={spinnerTestId} />);
        const spinner = getByTestId(spinnerTestId);
        expect(spinner).not.toBeNull();
    });
    test('should have a color', () => {
        const className = 'circleClass';
        const { container } = render(<Spinner color="#0dd9d5" circleClassName={className} />);
        const circle = container.querySelector(`.${className}`);
        expect(circle).toHaveStyle('background-color: #0dd9d5');
    });
    test('should have a passed className', () => {
        const className = 'Spinnerrrrrrr';
        const { getByTestId } = render(<Spinner dataTestId={spinnerTestId} className={className} />);
        const spinner = getByTestId(spinnerTestId);
        expect(spinner).toHaveClass('Spinnerrrrrrr');
    });
});
