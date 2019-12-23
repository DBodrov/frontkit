import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { H1, H2, H3 } from '../../components/Header';

describe('<H1 />', () => {
    test('should render an h1 element', () => {
        const headerText = 'Header';
        const { getByTestId, container } = render(<H1>{headerText}</H1>);
        const h1 = getByTestId('Header-H1');
        expect(h1).toHaveTextContent(headerText);
        expect(container.querySelector('h1')).not.toBeNull();
    });
    test('should have dataTestId an h1', () => {
        const headerText = 'Header';
        const { getByTestId } = render(<H1 dataTestId={headerText}>{headerText}</H1>);
        const h1 = getByTestId(headerText);
        expect(h1).toHaveTextContent(headerText);
    });
    test(`should have default 'header' and 'h1' classes`, () => {
        const headerClass = 'header';
        const h1Class = 'h1';
        const { getByTestId } = render(<H1/>);
        const h1 = getByTestId('Header-H1');
        expect(h1).toHaveClass(headerClass);
        expect(h1).toHaveClass(h1Class);
    });
    test('should pass external className', () => {
        const testClassName = 'Test-ClassName';
        const { getByTestId } = render(<H1 className={testClassName}/>);
        const h1 = getByTestId('Header-H1');
        expect(h1).toHaveClass(testClassName);
    });
    test('should pass external styles', () => {
        const style = { color: '#ff0000' };
        const { getByTestId } = render(<H1 style={style}/>);
        const h1 = getByTestId('Header-H1');
        expect(h1).toHaveStyle('color: #ff0000');
    });
});

describe('<H2 />', () => {
    test('should display an h2 header', () => {
        const headerText = 'Header';
        const { getByTestId, container } = render(<H2>{headerText}</H2>);
        const h2 = getByTestId('Header-H2');
        expect(h2).toHaveTextContent(headerText);
        expect(container.querySelector('h2')).not.toBeNull();
    });
    test('should have dataTestId an h2', () => {
        const headerText = 'Header';
        const { getByTestId } = render(<H2 dataTestId={headerText}>{headerText}</H2>);
        const h2 = getByTestId(headerText);
        expect(h2).toHaveTextContent(headerText);
    });
    test(`should have default 'header' and 'h2' classes`, () => {
        const headerClass = 'header';
        const h2Class = 'h2';
        const { getByTestId } = render(<H2/>);
        const h2 = getByTestId('Header-H2');
        expect(h2).toHaveClass(headerClass);
        expect(h2).toHaveClass(h2Class);
    });
    test('should pass external className', () => {
        const testClassName = 'Test-ClassName';
        const { getByTestId } = render(<H2 className={testClassName}/>);
        const h2 = getByTestId('Header-H2');
        expect(h2).toHaveClass(testClassName);
    });
    test('should pass external styles', () => {
        const style = { color: '#ff0000' };
        const { getByTestId } = render(<H2 style={style}/>);
        const h2 = getByTestId('Header-H2');
        expect(h2).toHaveStyle('color: #ff0000');
    });
});

describe('<H3 />', () => {
    test('should display an h3 header', () => {
        const headerText = 'Header';
        const { getByTestId, container } = render(<H3>{headerText}</H3>);
        const h2 = getByTestId('Header-H3');
        expect(h2).toHaveTextContent(headerText);
        expect(container.querySelector('h3')).not.toBeNull();
    });
    test('should have dataTestId an h3', () => {
        const headerText = 'Header';
        const { getByTestId } = render(<H3 dataTestId={headerText}>{headerText}</H3>);
        const h2 = getByTestId(headerText);
        expect(h2).toHaveTextContent(headerText);
    });
    test(`should have default 'header' and 'h3' classes`, () => {
        const headerClass = 'header';
        const h3Class = 'h3';
        const { getByTestId } = render(<H3/>);
        const h3 = getByTestId('Header-H3');
        expect(h3).toHaveClass(headerClass);
        expect(h3).toHaveClass(h3Class);
    });
    test('should pass external className', () => {
        const testClassName = 'Test-ClassName';
        const { getByTestId } = render(<H3 className={testClassName}/>);
        const h2 = getByTestId('Header-H3');
        expect(h2).toHaveClass(testClassName);
    });
    test('should pass external styles', () => {
        const style = { color: '#ff0000' };
        const { getByTestId } = render(<H3 style={style}/>);
        const h2 = getByTestId('Header-H3');
        expect(h2).toHaveStyle('color: #ff0000');
    });
});

