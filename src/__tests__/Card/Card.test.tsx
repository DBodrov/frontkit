import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../../components/Card';

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
        const { container } = render(
            <Card>
                <div>1</div>
                <div>2</div>
            </Card>,
        );
        expect(container).toMatchSnapshot();
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
        expect(card).toHaveClass('ItsACAAAARd');
    });
});
