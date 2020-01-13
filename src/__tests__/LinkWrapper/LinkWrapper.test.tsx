import { render } from '@testing-library/react';
import React from 'react';
import { LinkWrapper } from '../../components/LinkWrapper';
import { ThemeProvider } from '../../components/ThemeProvider';

const theme = {
    styles: {
        linkColor: '#8000ff',
    },
};

describe('<LinkWrapper />', () => {
    test('should render an LinkWrapper element', () => {
        const defaultTestId = 'LinkWrapper';
        const { getByTestId } = render(<LinkWrapper />);
        const link = getByTestId(defaultTestId);
        expect(link).not.toBeNull();
    });
    test('have theme style an Radio element', () => {
        const testId = 'testId';
        const { getByTestId } = render(
            <ThemeProvider value={theme}>
                <LinkWrapper dataTestId={testId} style={{ padding: '30px' }}>
                    123
                </LinkWrapper>
            </ThemeProvider>,
        );
        const link = getByTestId(testId);
        expect(link).toHaveStyle(`color: ${theme.styles.linkColor}`);
        expect(link).toHaveStyle(`padding: 30px`);
    });
});
