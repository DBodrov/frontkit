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

    test('should cards filling', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} onSuccess={mockFn} />);

        const ccNumber = getByTestId(cardsTestId + '-ccNumber-input');
        const ccName = getByTestId(cardsTestId + '-ccName-input');
        const ccExp = getByTestId(cardsTestId + '-ccExp-input');
        const ccCsc = getByTestId(cardsTestId + '-ccCsc-input');

        fireEvent.change(ccNumber, { target: { value: '4111111111111111' } });
        fireEvent.change(ccName, { target: { value: 'abu dvach' } });
        fireEvent.change(ccExp, { target: { value: '1288' } });
        fireEvent.change(ccCsc, { target: { value: '123' } });

        const mockCalls = mockFn.mock.calls;
        expect(mockCalls[mockCalls.length - 1]).toEqual([true]);
    });

    test('should cards filling with 01/22', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} onSuccess={mockFn} />);

        const ccNumber = getByTestId(cardsTestId + '-ccNumber-input');
        const ccName = getByTestId(cardsTestId + '-ccName-input');
        const ccExp = getByTestId(cardsTestId + '-ccExp-input');
        const ccCsc = getByTestId(cardsTestId + '-ccCsc-input');

        fireEvent.change(ccNumber, { target: { value: '4111111111111111' } });
        fireEvent.change(ccName, { target: { value: 'abu dvach' } });
        fireEvent.change(ccExp, { target: { value: '0122' } });
        fireEvent.change(ccCsc, { target: { value: '123' } });

        const mockCalls = mockFn.mock.calls;
        expect(mockCalls[mockCalls.length - 1]).toEqual([true]);
    });

    test('should cards broken with 01/20', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} onSuccess={mockFn} />);

        const ccNumber = getByTestId(cardsTestId + '-ccNumber-input');
        const ccName = getByTestId(cardsTestId + '-ccName-input');
        const ccExp = getByTestId(cardsTestId + '-ccExp-input');
        const ccCsc = getByTestId(cardsTestId + '-ccCsc-input');

        fireEvent.change(ccNumber, { target: { value: '4111111111111111' } });
        fireEvent.change(ccName, { target: { value: 'abu dvach' } });
        fireEvent.change(ccExp, { target: { value: '0120' } });
        fireEvent.change(ccCsc, { target: { value: '123' } });

        const mockCalls = mockFn.mock.calls;
        expect(mockCalls[mockCalls.length - 1]).toEqual([false]);
    });
});
