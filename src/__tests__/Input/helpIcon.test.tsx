import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { HelpIcon, Input } from '../../components/Input';
import { RootContainerProvider } from '../../components/RootContainer';
import { ThemeProvider } from '../../components/ThemeProvider';
const wrapperRef = React.createRef<HTMLDivElement>();
describe('help icon', () => {
    test('should render help icon', () => {
        const dataTestId = 'kjldaskjasdkj';
        const { getByTestId } = render(
            <RootContainerProvider value={wrapperRef}>
                <div ref={wrapperRef}>
                    <HelpIcon text="test" dataTestId={dataTestId} />
                </div>
            </RootContainerProvider>,
        );
        expect(() => getByTestId(dataTestId)).not.toThrow();
    });

    test('should not show tooltip on init', () => {
        const dataTestId = 'kjldaskjasdkj';
        const { getByTestId } = render(
            <RootContainerProvider value={wrapperRef}>
                <div ref={wrapperRef}>
                    <HelpIcon colorized text="test" dataTestId={dataTestId} />
                </div>
            </RootContainerProvider>,
        );
        expect(() => getByTestId(dataTestId + '-tooltip')).toThrow();
    });

    test('should show tooltip on icon click', () => {
        const dataTestId = 'kjldaskjasdkj';
        const { getByTestId } = render(
            <RootContainerProvider value={wrapperRef}>
                <div ref={wrapperRef}>
                    <HelpIcon text="test" dataTestId={dataTestId} />
                </div>
            </RootContainerProvider>,
        );

        const icon = getByTestId(dataTestId + '-icon');
        fireEvent.mouseEnter(icon);
        expect(() => getByTestId(dataTestId + '-tooltip')).not.toThrow();
    });

    test('should hide tooltip on icon second click', () => {
        const dataTestId = 'kjldaskjasdkj';
        const { getByTestId } = render(
            <RootContainerProvider value={wrapperRef}>
                <div ref={wrapperRef}>
                    <HelpIcon text="test" dataTestId={dataTestId} />
                </div>
            </RootContainerProvider>,
        );

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
                <Input
                    dataTestId={dataTestId}
                    RightIcon={() => (
                        <RootContainerProvider value={wrapperRef}>
                            <div ref={wrapperRef}>
                                <HelpIcon text="test" />
                            </div>
                        </RootContainerProvider>
                    )}
                />
                <div data-testid={outsideTestId} />
            </>,
        );

        const inputPart = getByTestId(dataTestId + '-input');
        const icon = getByTestId('input-search-icon-icon');

        fireEvent.click(icon);
        expect(document.activeElement).not.toBe(inputPart);
    });

    test('should have default data-testid', () => {
        const { getByTestId } = render(
            <RootContainerProvider value={wrapperRef}>
                <div ref={wrapperRef}>
                    <HelpIcon text="test" />
                </div>
            </RootContainerProvider>,
        );

        expect(() => getByTestId('input-search-icon')).not.toThrow();
    });
});
