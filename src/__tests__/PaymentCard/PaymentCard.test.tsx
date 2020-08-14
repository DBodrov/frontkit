import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PaymentCards, SelectCard } from '../../components/PaymentCard';

function assert(value: unknown): asserts value {
    if (!value) {
        throw new Error();
    }
}

const data = {
    default: true,
    id: '6fv1qjg2fk',
    link: 'https://www.a-3.ru/img/logo_png/MasterCard-vlbank-78x25.png',
    title: '**** **** **** 0002',
    type: 'MC',
};

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

    test('should cards filling with 01/99', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} onSuccess={mockFn} />);

        const ccNumber = getByTestId(cardsTestId + '-ccNumber-input');
        const ccName = getByTestId(cardsTestId + '-ccName-input');
        const ccExp = getByTestId(cardsTestId + '-ccExp-input');
        const ccCsc = getByTestId(cardsTestId + '-ccCsc-input');

        fireEvent.change(ccNumber, { target: { value: '4111111111111111' } });
        fireEvent.change(ccName, { target: { value: 'abu dvach' } });
        fireEvent.change(ccExp, { target: { value: '0199' } });
        fireEvent.change(ccCsc, { target: { value: '123' } });

        const mockCalls = mockFn.mock.calls;
        expect(mockCalls[mockCalls.length - 1]).toEqual([true]);
    });

    test('should cards broken with 01/00', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} onSuccess={mockFn} />);

        const ccNumber = getByTestId(cardsTestId + '-ccNumber-input');
        const ccName = getByTestId(cardsTestId + '-ccName-input');
        const ccExp = getByTestId(cardsTestId + '-ccExp-input');
        const ccCsc = getByTestId(cardsTestId + '-ccCsc-input');

        fireEvent.change(ccNumber, { target: { value: '4111111111111111' } });
        fireEvent.change(ccName, { target: { value: 'abu dvach' } });
        fireEvent.change(ccExp, { target: { value: '0100' } });
        fireEvent.change(ccCsc, { target: { value: '123' } });

        const mockCalls = mockFn.mock.calls;
        expect(mockCalls[mockCalls.length - 1]).toEqual([false]);
    });

    test('should cards valid with 12/99', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} onSuccess={mockFn} />);

        const ccNumber = getByTestId(cardsTestId + '-ccNumber-input');
        const ccName = getByTestId(cardsTestId + '-ccName-input');
        const ccExp = getByTestId(cardsTestId + '-ccExp-input');
        const ccCsc = getByTestId(cardsTestId + '-ccCsc-input');

        fireEvent.change(ccNumber, { target: { value: '4111111111111111' } });
        fireEvent.change(ccName, { target: { value: 'abu dvach' } });
        fireEvent.change(ccExp, { target: { value: '1299' } });
        fireEvent.change(ccCsc, { target: { value: '123' } });

        const mockCalls = mockFn.mock.calls;
        expect(mockCalls[mockCalls.length - 1]).toEqual([true]);
    });

    test('should cards invalid with 00/99', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} onSuccess={mockFn} />);

        const ccNumber = getByTestId(cardsTestId + '-ccNumber-input');
        const ccName = getByTestId(cardsTestId + '-ccName-input');
        const ccExp = getByTestId(cardsTestId + '-ccExp-input');
        const ccCsc = getByTestId(cardsTestId + '-ccCsc-input');

        fireEvent.change(ccNumber, { target: { value: '4111111111111111' } });
        fireEvent.change(ccName, { target: { value: 'abu dvach' } });
        fireEvent.change(ccExp, { target: { value: '0099' } });
        fireEvent.change(ccCsc, { target: { value: '123' } });

        const mockCalls = mockFn.mock.calls;
        expect(mockCalls[mockCalls.length - 1]).toEqual([false]);
    });

    test('should SelectCard filling', () => {
        const { getByTestId } = render(<SelectCard
            dataTestId={cardsTestId}
            data={data}
            active={true}
            onSuccess={mockFn}
        />);

        const ccCsc = getByTestId(cardsTestId + '-ccCsc-input');

        fireEvent.change(ccCsc, { target: { value: 'asd' } });
        fireEvent.change(ccCsc, { target: { value: '123' } });

        const mockCalls = mockFn.mock.calls;
        expect(mockCalls[mockCalls.length - 2]).toEqual([false]);
        expect(mockCalls[mockCalls.length - 1]).toEqual([true]);
    });

});

describe('<SelectCard />', () => {
    const cardsTestId = 'cardZZ';

    test('should cards rendered', () => {
        const { getByTestId } = render(
            <SelectCard
                dataTestId={cardsTestId}
                data={data}
                active={true}
            />,
        );
        const cards = getByTestId(cardsTestId);
        expect(cards).not.toBeNull();
    });

    test('should have default dataTestId', () => {
        const className = 'testtt';
        const { container } = render(
            <SelectCard
                data={data}
                className={className}
                active={true}
            />,
        );
        const cards = container.querySelector<HTMLElement>('.' + className);
        assert(cards);

        expect(cards.dataset.testid).toBe('SelectCard');
    });

    test('should have a passed className', () => {
        const cardsTestId = 'cardZZ';
        const className = 'Плоти';

        const { getByTestId } = render(
            <SelectCard
                dataTestId={cardsTestId}
                data={data}
                className={className}
                active={false}
            />,
        );
        const cards = getByTestId(cardsTestId);
        expect(cards).toHaveClass('Плоти');
    });
});
