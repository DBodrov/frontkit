import React from 'react';
import { render } from '@testing-library/react';

import { Spinner } from '../../components/Spinner';

describe('<Spinner />', () => {
    const spinnerTestId = 'Spinner';

    test('should spinner rendered', () => {
        const { getByTestId } = render(<Spinner />);
        const spinner = getByTestId(spinnerTestId);
        expect(spinner).toMatchSnapshot();
    });
    test('should have a color', () => {
        const { getByTestId } = render(<Spinner color="#0dd9d5" />);
        const spinner = getByTestId(spinnerTestId);
        expect(spinner.children[0].children[0]).toHaveStyle('background-color: #0dd9d5');
    });
    test('should have a passed className', () => {
        const className = 'Spinnerrrrrrr';
        const { getByTestId } = render(<Spinner dataTestId={spinnerTestId} className={className} />);
        const spinner = getByTestId(spinnerTestId);
        expect(spinner).toHaveClass('Spinnerrrrrrr');
    });
});
