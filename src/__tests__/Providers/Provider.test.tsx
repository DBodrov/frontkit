import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from '../../components/Providers';

const testId = 'dlaskljdaskljdas';

describe('<Provider />', () => {
    test('should provider clickable', () => {
        const clickHandler = jest.fn();
        const { getByTestId } = render(<Provider src="src" name="name" dataTestId={testId} onClick={clickHandler} />);
        const provider = getByTestId(testId);
        expect(provider).not.toBeNull();

        fireEvent.click(provider);
        expect(clickHandler).toBeCalledTimes(1);
    });
});
