import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, StyleTypeProp } from '../../components/Button';
import { ThemeProvider } from '../../components/ThemeProvider';

const theme = {
    styles: {
        mainColor: '#8000ff',
    },
    className: 'cn2',
};

describe('<Button />', () => {
    test('should render an Button element', () => {
        const buttonClass = 'btn';
        const buttonTestId = 'newButton';
        const { getByTestId } = render(<Button className={buttonClass} dataTestId={buttonTestId} />);
        const button = getByTestId(buttonTestId);
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
    test('should have color from theme', () => {
        const { container } = render(
            <ThemeProvider value={theme}>
                <Button />
            </ThemeProvider>,
        );
        const button = container.querySelector(`.${theme.className}`);
        expect(button).toHaveStyle(`background-color: ${theme.styles.mainColor}`);
    });
    test('should have color from theme', () => {
        const { container } = render(
            <ThemeProvider value={theme}>
                <Button styleType={StyleTypeProp.UsedDefault} />
            </ThemeProvider>,
        );
        const button = container.querySelector(`.${theme.className}`);
        expect(button).toHaveStyle('background-color: #EAEEF4');
    });
    test('should have color from theme', () => {
        const { container } = render(
            <ThemeProvider value={theme}>
                <Button styleType={StyleTypeProp.WhiteBodyWithShadow} />
            </ThemeProvider>,
        );
        const button = container.querySelector(`.${theme.className}`);
        expect(button).toHaveStyle('box-shadow: 0px 4px 6px rgba(170, 187, 208, 0.16)');
    });
    test('should have color from theme', () => {
        const { container } = render(
            <ThemeProvider value={theme}>
                <Button styleType={StyleTypeProp.WhiteBodyWithBorder} />
            </ThemeProvider>,
        );
        const button = container.querySelector(`.${theme.className}`);
        expect(button).toHaveStyle(`border: 1px solid ${theme.styles.mainColor}`);
    });
});
