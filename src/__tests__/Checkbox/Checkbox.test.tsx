import { render } from '@testing-library/react';
import React from 'react';
import { Checkbox } from '../../components/Checkbox';
import { ThemeProvider } from '../../components/ThemeProvider';

const theme = {
    styles: {
        mainColor: '#8000ff',
    },
    className: 'cn2',
};

const testId = 'wasasddasdas';

describe('<Checkbox />', () => {
    test('should render an Checkbox element', () => {
        const { getByTestId } = render(<Checkbox dataTestId={testId} />);
        expect(() => getByTestId(testId)).not.toThrow();
    });
    test('should render an Checkbox with component inside label', () => {
        const { getByTestId } = render(<Checkbox dataTestId={testId} Label={() => <>123</>} />);
        const label = getByTestId(testId + '-label');
        expect(label).toHaveTextContent('123');
    });
    test('have dataTestId an Checkbox element', () => {
        const { getByTestId } = render(<Checkbox dataTestId={testId} Label="labelText" />);
        expect(() => getByTestId(testId)).not.toThrow();
        expect(() => getByTestId(testId + '-label')).not.toThrow();
        expect(() => getByTestId(testId + '-bigBox')).not.toThrow();
        expect(() => getByTestId(testId + '-smallBox')).not.toThrow();
        expect(() => getByTestId(testId + '-label-text')).not.toThrow();
    });
    test('have theme style an Checkbox element', () => {
        const label = 'label22';
        const { getByTestId } = render(
            <ThemeProvider value={theme}>
                <Checkbox dataTestId={testId} Label={label} hintText="23434кц312312 3123 123 123 123 1231231 123123 123 к" />
            </ThemeProvider>,
        );
        const checkbox = getByTestId(testId + '-smallBox');
        expect(checkbox).toHaveStyle(`background: ${theme.styles.mainColor}`);
    });
    test('should have default data-testid', () => {
        const { getByTestId } = render(<Checkbox />);
        expect(() => getByTestId('Checkbox')).not.toThrow();
    });
    test('should have default id', () => {
        const { container } = render(<Checkbox />);
        expect(container.querySelector("#Checkbox")).not.toBeNull();
    });
    test('should have id', () => {
        const id = 'kljdaskljdas';
        const { container } = render(<Checkbox id={id} />);
        expect(container.querySelector("#" + id)).not.toBeNull();
    });
});
