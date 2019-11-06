import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { H1, H2 } from '../../components/Header';

describe('<H1 />', () => {
    test('should render an h1 element', () => {
        const headerText = 'Header';
        const { getByTestId } = render(<H1>{headerText}</H1>);
        const h1 = getByTestId('Header-H1');
        expect(h1).toHaveTextContent(headerText);
    });
    test(`should have default 'header' and 'h1' classes`, () => {
        const headerClass = 'header';
        const h1Class = 'h1';
        const { getByTestId } = render(<H1></H1>);
        const h1 = getByTestId('Header-H1');
        expect(h1).toHaveClass(headerClass);
        expect(h1).toHaveClass(h1Class);
    });
    test('should pass external className', () => {
        const testClassName = 'Test-ClassName';
        const { getByTestId } = render(<H1 className={testClassName}></H1>);
        const h1 = getByTestId('Header-H1');
        expect(h1).toHaveClass(testClassName);
    });
    test('should pass external styles', () => {
        const style = { color: '#ff0000' };
        const { getByTestId } = render(<H1 style={style}></H1>);
        const h1 = getByTestId('Header-H1');
        expect(h1).toHaveStyle('color: #ff0000');
    });
});

describe('<H2 />', () => {
    test('should display an h2 header', () => {
        const headerText = 'Header';
        const { getByTestId } = render(<H2>{headerText}</H2>);
        const h2 = getByTestId('Header-H2');
        expect(h2).toHaveTextContent(headerText);
    });
    test(`should have default 'header' and 'h2' classes`, () => {
        const headerClass = 'header';
        const h2Class = 'h2';
        const { getByTestId } = render(<H2></H2>);
        const h2 = getByTestId('Header-H2');
        expect(h2).toHaveClass(headerClass);
        expect(h2).toHaveClass(h2Class);
    });
    test('should pass external className', () => {
        const testClassName = 'Test-ClassName';
        const { getByTestId } = render(<H2 className={testClassName}></H2>);
        const h2 = getByTestId('Header-H2');
        expect(h2).toHaveClass(testClassName);
    });
    test('should pass external styles', () => {
        const style = { color: '#ff0000' };
        const { getByTestId } = render(<H2 style={style}></H2>);
        const h2 = getByTestId('Header-H2');
        expect(h2).toHaveStyle('color: #ff0000');
    });
});
