import { render } from '@testing-library/react';
import React from 'react';

import { DatePicker } from '../../components/DatePicker';

describe('<DatePicker />', () => {
    test('should render DatePicker', () => {
        const dataPickerTestId = 'dataPickerTestId';
        const className = 'dataPickerStyles';

        const { getByTestId } = render(<DatePicker name="ccExp" error={true} disabled={false} className={className} dataTestId={dataPickerTestId} />);
        const datePicker = getByTestId(dataPickerTestId);
        expect(datePicker).not.toBeNull();
    });

    it('should render required props', () => {
        const dataPickerTestId = 'dataPickerTestId';
        const className = 'dataPickerStyles';

        const { container } = render(<DatePicker name='ccExp' error={true} disabled={false} className={className} dataTestId={dataPickerTestId} />);
        const firstInput = container.getElementsByTagName('input')[0];

        expect(firstInput).toHaveAttribute('name', 'ccExp')
      });

      it('should render custom input with data-testid from props DatePicker', () => {
        const dataPickerTestId = 'dataPickerTestId';
        const className = 'dataPickerStyles';

        const { container } = render(<DatePicker name='ccExp' error={true} disabled={false} className={className} dataTestId={dataPickerTestId} />);
        const customInput = container.getElementsByTagName('input')[1];

        expect(customInput).toHaveAttribute('data-testid', dataPickerTestId + '-input')
      });
});

