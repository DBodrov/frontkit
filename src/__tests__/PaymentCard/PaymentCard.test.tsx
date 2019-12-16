import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PaymentCards } from '../../components/PaymentCard';

function assert(value: unknown): asserts value {
    if (!value) {
        throw new Error();
    }
}

describe('<PaymentCard />', () => {
    const cardsTestId = 'cardZZ';

    test('should cards rendered', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} />);
        const cards = getByTestId(cardsTestId);
        expect(cards).not.toBeNull();
    });

    test('should have default dataTestId', () => {
        const className = 'testtt';
        const { container } = render(<PaymentCards className={className} />);
        const cards = container.querySelector<HTMLElement>('.' + className);
        assert(cards);

        expect(cards.dataset.testid).toBe('PaymentCard');
    });

    test('should have a passed className', () => {
        const cardsTestId = 'cardZZ';
        const className = 'Плоти';

        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} className={className} />);
        const cards = getByTestId(cardsTestId);
        expect(cards).toHaveClass('Плоти');
    });
});

describe('PaymentCard filling', () => {
    const cardsTestId = 'cardZZ';

    const mockFn = jest.fn();

    test('should cards rendered', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} onSuccess={mockFn} />);

        const ccNumber = getByTestId(cardsTestId + '-cc-number');
        const ccName = getByTestId(cardsTestId + '-cc-name');
        const ccExp = getByTestId(cardsTestId + '-cc-exp');
        const ccCsc = getByTestId(cardsTestId + '-cc-csc');

        fireEvent.change(ccNumber, { target: { value: '4111111111111111' } });
        fireEvent.change(ccName, { target: { value: 'abu dvach' } });
        fireEvent.change(ccExp, { target: { value: '1488' } });
        fireEvent.change(ccCsc, { target: { value: '123' } });

        const mockCalls = mockFn.mock.calls;
        expect(mockCalls[mockCalls.length - 1]).toEqual([true]);
    });
});
