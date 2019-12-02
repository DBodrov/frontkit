import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../../components/Card';

function assert(value: unknown): asserts value {
    if (!value) {
        throw new Error();
    }
}

describe('<Card />', () => {
    const cardTestId = 'Cardddd';

    test('should card rendered', () => {
        const { getByTestId } = render(
            <Card dataTestId={cardTestId}>
                <div>1</div>
            </Card>,
        );
        const card = getByTestId(cardTestId);
        expect(card).not.toBeNull();
    });
    test('should have a childrens', () => {
        const className = 'ItsACAAAARd';
        const { container } = render(
            <Card className={className}>
                <div>1</div>
                <div>2</div>
            </Card>,
        );
        const card = container.querySelector(`.${className}`);

        expect(card).not.toBeNull();
        assert(card !== null);

        expect(card.childNodes.length).toBeGreaterThan(0);
    });
    test('should have a passed className', () => {
        const className = 'ItsACAAAARd';
        const { getByTestId } = render(
            <Card dataTestId={cardTestId} className={className}>
                <div>1</div>
                <div>2</div>
            </Card>,
        );
        const card = getByTestId(cardTestId);
        expect(card).toHaveClass(className);
    });
});
