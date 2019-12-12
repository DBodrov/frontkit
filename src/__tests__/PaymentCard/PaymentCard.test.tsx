import React from 'react';
import { render } from '@testing-library/react';
import { PaymentCards } from '../../components/PaymentCard';
import { isInvalidInput, validate, isFormInvalid } from '../../components/PaymentCard/validators';
import { format } from '../../components/PaymentCard/formatters';

describe('<Spinner />', () => {
    const cardsTestId = 'cardZZ';

    test('should cards rendered', () => {
        const { getByTestId } = render(<PaymentCards dataTestId={cardsTestId} />);
        const cards = getByTestId(cardsTestId);
        expect(cards).not.toBeNull();
    });
});

describe('format', () => {
    const initialCC = '4111111111111111';
    const expectCC = '4111 1111 1111 1111';
    const initialName = 'abu dvach';
    const expectName = 'ABU DVACH';
    const initialDate = '1488';
    const expectDate = '14/88';

    test('format cc', () => {
        expect(initialCC).toBe(expectCC);
    });
    test('format name', () => {
        expect(initialName).toBe(expectName);
    });
    test('format date', () => {
        expect(initialDate).toBe(expectDate);
    });
});
