import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '../../components/Button';

describe('<Button />', () => {
    test('should render an Button element', () => {
        const buttonClass = 'btn';
        const buttonTestId = 'newButton';
        const { getByTestId } = render(<Button className={buttonClass} dataTestId={buttonTestId} />);
        const button = getByTestId('Button');
        expect(button).not.toBeNull();
        expect(button).toHaveClass(buttonClass);
    });
    test('should have custom style', () => {
        const style = { color: '#000000' };
        const buttonTestId = 'newButton';
        const { getByTestId } = render(<Button style={style} dataTestId={buttonTestId} />);
        const button = getByTestId(buttonTestId);
        expect(button).toHaveStyle('color: #000000');
    });
    test('should have children', () => {
        const buttonText = 'Button';
        const buttonTestId = 'newButton';
        const { getByTestId } = render(<Button dataTestId={buttonTestId}>{buttonText}</Button>);
        const button = getByTestId(buttonTestId);
        expect(button).toHaveTextContent(buttonText);
    });
    test('should have data-testid', () => {
        const { getByTestId } = render(<Button />);
        const button = getByTestId('Button');
        expect(button).not.toBeNull();
    });
});
