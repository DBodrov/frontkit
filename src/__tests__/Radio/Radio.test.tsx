import { render } from '@testing-library/react';
import React from 'react';
import { Radio } from '../../components/Radio';
import { ThemeProvider } from '../../components/ThemeProvider';

const theme = {
    styles: {
        mainColor: '#8000ff',
    },
};

describe('<Radio />', () => {
    test('should render an Radio element', () => {
        const radioTestId = 'Radio';
        const { getByTestId } = render(<Radio name="123" label="123" value="123"/>);
        const radio = getByTestId(radioTestId);
        expect(radio).not.toBeNull();
    });
    test('have theme style an Radio element', () => {
        const radioTestId = 'newRadio';
        const { getByTestId } = render(
            <ThemeProvider value={theme}>
                <Radio name="123" label="123" value="123" dataTestId={radioTestId}/>
                <Radio name="123" label="1234" value="1234" dataTestId={radioTestId + 2}/>
                <Radio disabled name="123" label="12345" value="12345" dataTestId={radioTestId + 3}/>
            </ThemeProvider>,
        );
        const checkbox = getByTestId(radioTestId + '-SmallCircle');
        expect(checkbox).toHaveStyle(`background: ${theme.styles.mainColor}`);
    });
});
