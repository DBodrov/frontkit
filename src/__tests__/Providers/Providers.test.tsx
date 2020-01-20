import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { Providers } from '../../components/Providers';

const testId = 'dlaskljdaskljdas';

describe('<Providers />', () => {
    test('should providers rendered', () => {
        const { getByTestId } = render(
            <Providers
                dataTestId={testId}
                size={2}
                data={[
                    { id: 1, name: 'name1', src: 'src1' },
                    { id: 2, name: 'name2', src: 'src2' },
                ]}
                gap="1fr"
            />,
        );
        const providers = getByTestId(testId);
        expect(providers).not.toBeNull();
    });

    test('default test id should be "providers"', () => {
        const { getByTestId } = render(
            <Providers
                size={2}
                data={[
                    { id: 1, name: 'name1', src: 'src1' },
                    { id: 2, name: 'name2', src: 'src2' },
                ]}
            />,
        );
        const providers = getByTestId('providers');
        expect(providers).not.toBeNull();
    });

    test('should return element after click on it', () => {
        const clickHandler = jest.fn();
        const el = { id: 1, name: 'name1', src: 'src1' };
        const { getByTestId } = render(
            <Providers dataTestId={testId} size={2} data={[el, { id: 2, name: 'name2', src: 'src2' }]} gap="1fr" onClick={clickHandler} />,
        );
        fireEvent.click(getByTestId(testId + '-single-1'));

        expect(clickHandler).toBeCalledTimes(1);
        expect(clickHandler).toBeCalledWith(el);
    });


    test('should return element after click on his children', () => {
        const clickHandler = jest.fn();
        const el = { id: 1, name: 'name1', src: 'src1' };
        const { getByTestId } = render(
            <Providers dataTestId={testId} size={2} data={[el, { id: 2, name: 'name2', src: 'src2' }]} gap="1fr" onClick={clickHandler} />,
        );
        fireEvent.click(getByTestId(testId + '-single-1-image'));

        expect(clickHandler).toBeCalledTimes(1);
        expect(clickHandler).toBeCalledWith(el);
    });
});

describe('scrolling', () => {
    let rendered: RenderResult;
    beforeEach(() => {
        rendered = render(
            <Providers
                dataTestId={testId}
                size={2}
                data={[
                    { id: 1, name: 'name1', src: 'src1' },
                    { id: 2, name: 'name2', src: 'src2' },
                    { id: 3, name: 'name3', src: 'src3' },
                    { id: 4, name: 'name4', src: 'src4' },
                ]}
            />,
        );
    });

    test('should third provider rendered after scroll right', () => {
        fireEvent.click(rendered.getByTestId(testId + '-scroller-increase'));

        expect(rendered.getByTestId(testId + '-single-3')).not.toBeNull();
        expect(() => rendered.getByTestId(testId + '-single-1')).toThrow();
    });

    test('should first provider rendered after scroll left', () => {
        fireEvent.click(rendered.getByTestId(testId + '-scroller-increase'));
        fireEvent.click(rendered.getByTestId(testId + '-scroller-decrease'));

        expect(rendered.getByTestId(testId + '-single-1')).not.toBeNull();
        expect(() => rendered.getByTestId(testId + '-single-3')).toThrow();
    });
});

describe('disabled scrolling', () => {
    test('shouldn\'t render scrolling control if size more data.length', () => {
        const {getByTestId} = render(
            <Providers
                dataTestId={testId}
                size={5}
                data={[
                    { id: 1, name: 'name1', src: 'src1' },
                    { id: 2, name: 'name2', src: 'src2' },
                    { id: 3, name: 'name3', src: 'src3' },
                    { id: 4, name: 'name4', src: 'src4' },
                ]}
            />,
        );

        expect(() => getByTestId(testId + '-scroller')).toThrow();
    });
});
