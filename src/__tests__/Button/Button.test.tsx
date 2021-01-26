import { render } from '@testing-library/react';
import React from 'react';
import { Button, LoadingButton, StyleTypeProp } from '../../components/Button';
import { ThemeProvider } from '../../components/ThemeProvider';

const theme = {
    mainColor: '#8000ff',
};
const dataTestId = '123123qwasddas';

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
    test('should have loading data-testid', () => {
        const { getByTestId } = render(
            <LoadingButton loading disabled styleType={StyleTypeProp.Default} text="asd" dataTestId="LoadingButton" />,
        );
        const button = getByTestId('LoadingButton');
        expect(button).not.toBeNull();
    });
    test('should have loading data-testid 2', () => {
        const { getByTestId } = render(
            <LoadingButton disabled loading={false} styleType={StyleTypeProp.Default} text="asd" dataTestId="LoadingButton" />,
        );
        const button = getByTestId('LoadingButton');
        expect(button).not.toBeNull();
    });
    test('should have color from theme', () => {
        const { container } = render(
            <ThemeProvider value={theme}>
                <Button />
            </ThemeProvider>,
        );
        const button = container.querySelector(`button`);
        expect(button).toHaveStyle(`background-color: ${theme.mainColor}`);
    });
    test('should have color from theme', () => {
        const { getByTestId } = render(
            <ThemeProvider value={theme}>
                <Button dataTestId={dataTestId} styleType={StyleTypeProp.UsedDefault} />
            </ThemeProvider>,
        );
        const button = getByTestId(dataTestId);
        expect(button).toHaveStyle('background-color: #EAEEF4');
    });
    test('should have color from theme', () => {
        const { getByTestId } = render(
            <ThemeProvider value={theme}>
                <Button dataTestId={dataTestId} styleType={StyleTypeProp.WhiteBodyWithShadow} />
            </ThemeProvider>,
        );
        const button = getByTestId(dataTestId);
        expect(button).toHaveStyle('box-shadow: 0px 4px 6px rgba(170, 187, 208, 0.16)');
    });
    test('should have color from theme', () => {
        const { getByTestId } = render(
            <ThemeProvider value={theme}>
                <Button dataTestId={dataTestId} styleType={StyleTypeProp.WhiteBodyWithBorder} />
            </ThemeProvider>,
        );
        const button = getByTestId(dataTestId);
        expect(button).toHaveStyle(`border: 1px solid ${theme.mainColor}`);
    });
});
