import React from 'react';
import { render } from '@testing-library/react';
import { Box } from '../../components/Box';

function assert(value: unknown): asserts value {
    if (!value) {
        throw new Error();
    }
}

describe('<Box />', () => {
    const boxTestId = 'Booooox';

    test('should box rendered', () => {
        const { getByTestId } = render(
            <Box dataTestId={boxTestId}>
                <div>1</div>
            </Box>,
        );
        const box = getByTestId(boxTestId);
        expect(box).not.toBeNull();
    });
    test('should have a childrens', () => {
        const className = 'ItsACAAAARd';
        const { container } = render(
            <Box className={className}>
                <div>1</div>
                <div>2</div>
            </Box>,
        );
        const box = container.querySelector(`.${className}`);

        expect(box).not.toBeNull();
        assert(box !== null);

        expect(box.childNodes.length).toBeGreaterThan(0);
    });
    test('should have a passed className', () => {
        const className = 'ItsACAAAARd';
        const { getByTestId } = render(
            <Box dataTestId={boxTestId} className={className}>
                <div>1</div>
                <div>2</div>
            </Box>,
        );
        const box = getByTestId(boxTestId);
        expect(box).toHaveClass(className);
    });
});
