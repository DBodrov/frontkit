import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { HelpIcon } from '../../components/Input';

describe('help icon', () => {
    test('should render help icon', () => {
        const dataTestId = 'kjldaskjasdkj';
        const { getByTestId } = render(<HelpIcon text="test" dataTestId={dataTestId} />);
        expect(() => getByTestId(dataTestId)).not.toThrow();
    });

    test('should not show tooltip on init', () => {
        const dataTestId = 'kjldaskjasdkj';
        const { getByTestId } = render(<HelpIcon text="test" dataTestId={dataTestId} />);
        expect(() => getByTestId(dataTestId + '-tooltip')).toThrow();
    });

    test('should show tooltip on icon click', () => {
        const dataTestId = 'kjldaskjasdkj';
        const { getByTestId } = render(<HelpIcon text="test" dataTestId={dataTestId} />);

        const icon = getByTestId(dataTestId + '-icon');
        fireEvent.click(icon);
        expect(() => getByTestId(dataTestId + '-tooltip')).not.toThrow();
    });

    test('should hide tooltip on icon second click', () => {
        const dataTestId = 'kjldaskjasdkj';
        const { getByTestId } = render(<HelpIcon text="test" dataTestId={dataTestId} />);

        const icon = getByTestId(dataTestId + '-icon');
        fireEvent.click(icon);
        fireEvent.click(icon);
        expect(() => getByTestId(dataTestId + '-tooltip')).toThrow();
    });

    test('should hide tooltip on click outside', () => {
        const dataTestId = 'kjldaskjasdkj';
        const outsideDataTestId = 'outside';
        const { getByTestId } = render(
            <>
                <HelpIcon text="test" dataTestId={dataTestId} />
                <div data-testid={outsideDataTestId} />
            </>,
        );

        const icon = getByTestId(dataTestId + '-icon');
        const outside = getByTestId(outsideDataTestId);
        fireEvent.click(icon);
        fireEvent.click(outside);
        expect(() => getByTestId(dataTestId + '-tooltip')).toThrow();
    });

    test('should have default data-testid', () => {
        const { getByTestId } = render(<HelpIcon text="test" />);

        expect(() => getByTestId('input-search-icon')).not.toThrow();
    });
});
