import React from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ThemeProvider } from '../../components/ThemeProvider';
import { fireEvent, render, RenderResult } from '@testing-library/react';

const theme = {
    styles: {
        linkColor: '#8000ff',
    },
    className: 'cn1',
};

const mockFunc = jest.fn();

const simpleBreadCrumbs = [
    {
        text: 'Главная',
        onClick: mockFunc,
        active: false,
    },
];

const fullBreadCrumbs = [
    {
        text: 'Главная',
        onClick: mockFunc,
        active: true,
    },
    {
        text: 'Данные платежа',
        active: false,
    },
    {
        text: 'Оплата',
        active: true,
    },
];

describe('<BreadCrumbs />', () => {
    test('should render element', () => {
        const breadCrumbsClass = 'bc';
        const breadCrumbsTestId = 'newBreadCrumbs';
        const { getByTestId } = render(<BreadCrumbs data={fullBreadCrumbs} className={breadCrumbsClass} dataTestId={breadCrumbsTestId} />);
        const element = getByTestId(breadCrumbsTestId);
        const link = getByTestId(breadCrumbsTestId + '-mc-text');
        expect(link).toHaveStyle('color: #4B8BDA');
        expect(element).not.toBeNull();
        expect(element).toHaveClass(breadCrumbsClass);
    });
    test('should render element without data', () => {
        const { getByTestId } = render(<BreadCrumbs />);
        const link = getByTestId('emptyBreadCrumbs');
        expect(link).not.toBeNull();
    });
    test('should have style', () => {
        const { getByTestId } = render(<BreadCrumbs data={simpleBreadCrumbs} />);
        const link = getByTestId('BreadCrumbs-mc-text');
        const element = getByTestId('BreadCrumbs');
        expect(element).not.toBeNull();
        expect(link).toHaveStyle('color: inherit');
    });
    test('should have style 2', () => {
        const { getByTestId } = render(
            <ThemeProvider value={theme}>
                <BreadCrumbs data={fullBreadCrumbs} />
            </ThemeProvider>,
        );
        const element = getByTestId('BreadCrumbs-mc-text');
        expect(element).toHaveStyle(`color: ${theme.styles.linkColor}`);
    });
});

describe('click', () => {
    let rendered: RenderResult;
    beforeEach(() => {
        rendered = render(
            <BreadCrumbs data={fullBreadCrumbs}
            />,
        );
    });

    test('should click', () => {
        fireEvent.click(rendered.getByTestId('BreadCrumbs-mc-text'));
        expect(mockFunc).toBeCalled();
    });
});
