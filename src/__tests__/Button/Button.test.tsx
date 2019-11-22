import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '../../components/Button';

describe('<Button />', () => {
    test('should render an Button element', () => {
        const buttonClass = 'btn';
        const { getByTestId } = render(<Button className={buttonClass}/>);
        const button = getByTestId('Button');
        expect(button).not.toBeNull();
        expect(button).toHaveClass(buttonClass);
    });
    test('should have custom style', () => {
        const style = { color: '#000000' };
        const { getByTestId } = render(<Button style={style}/>);
        const button = getByTestId('Button');
        expect(button).toHaveStyle('color: #000000');
    });
    test('should have children', () => {
        const buttonText = 'Button';
        const { getByTestId } = render(<Button>{buttonText}</Button>);
        const button = getByTestId('Button');
        expect(button).toHaveTextContent(buttonText);
    });
    test('should have data-testid', () => {
        const buttonTestId = 'newButton';
        const { getByTestId } = render(<Button dataTestId={buttonTestId}/>);
        const button = getByTestId(buttonTestId);
        expect(button).not.toBeNull();
    });
});
