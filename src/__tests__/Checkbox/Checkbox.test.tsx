import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Checkbox } from '../../components/Checkbox';
import { ThemeProvider } from '../../components/ThemeProvider';

const theme = {
    styles: {
        mainColor: '#8000ff',
    },
    className: 'cn2',
};

describe('<Checkbox />', () => {
    test('should render an Checkbox element', () => {
        const checkboxTestId = 'Checkbox';
        const checkboxId = 'Checkbox';
        const { getByTestId, container } = render(<Checkbox id={checkboxId} />);
        const checkbox = getByTestId(checkboxTestId);
        const checkboxById = container.querySelector(`#${checkboxId}`);
        expect(checkbox).not.toBeNull();
        expect(checkboxById).not.toBeNull();
    });
    test('have dataTestId an Checkbox element', () => {
        const checkboxTestId = 'newCheckbox';
        const { getByTestId } = render(<Checkbox dataTestId={checkboxTestId} label="labelText" />);
        const checkbox = getByTestId(checkboxTestId);
        const label = getByTestId(checkboxTestId + '-label');
        const bigBox = getByTestId(checkboxTestId + '-bigBox');
        const smallBox = getByTestId(checkboxTestId + '-smallBox');
        const labelText = getByTestId(checkboxTestId + '-label-text');
        expect(checkbox).not.toBeNull();
        expect(label).not.toBeNull();
        expect(bigBox).not.toBeNull();
        expect(smallBox).not.toBeNull();
        expect(labelText).not.toBeNull();
    });
    test('have theme style an Checkbox element', () => {
        const checkboxTestId = 'newCheckbox';
        const label = 'label22';
        const { getByTestId } = render(
            <ThemeProvider value={theme}>
                <Checkbox dataTestId={checkboxTestId} label={label} />
            </ThemeProvider>,
        );
        const checkbox = getByTestId(checkboxTestId + '-smallBox');
        expect(checkbox).toHaveStyle(`background: ${theme.styles.mainColor}`);
    });
});
