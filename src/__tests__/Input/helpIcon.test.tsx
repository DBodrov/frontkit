import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { HelpIcon, Input } from '../../components/Input';

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
        fireEvent.mouseEnter(icon);
        expect(() => getByTestId(dataTestId + '-tooltip')).not.toThrow();
    });

    test('should hide tooltip on icon second click', () => {
        const dataTestId = 'kjldaskjasdkj';
        const { getByTestId } = render(<HelpIcon text="test" dataTestId={dataTestId} />);

        const icon = getByTestId(dataTestId + '-icon');
        fireEvent.mouseEnter(icon);
        fireEvent.mouseLeave(icon);
        expect(() => getByTestId(dataTestId + '-tooltip')).toThrow();
    });
    test('should loose focus on click ouside', () => {
        const dataTestId = '123asdasda';
        const outsideTestId = 'outside';
        const { getByTestId } = render(
            <>
                <Input dataTestId={dataTestId} RightIcon={() => <HelpIcon text="test" />}/>
                <div data-testid={outsideTestId} />
            </>,
        );

        const inputPart = getByTestId(dataTestId + '-input');
        const icon = getByTestId('input-search-icon-icon');

        fireEvent.click(icon);
        expect(document.activeElement).not.toBe(inputPart)
    });

    test('should have default data-testid', () => {
        const { getByTestId } = render(<HelpIcon text="test" />);

        expect(() => getByTestId('input-search-icon')).not.toThrow();
    });
});
