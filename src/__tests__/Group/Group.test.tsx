import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Group } from '../../components/Group';

describe('<Group />', () => {
    test('should render an Group element', () => {
        const groupClass = 'group22';
        const { getByTestId } = render(<Group className={groupClass}/>);
        const group = getByTestId('Group-Container');
        expect(group).toHaveClass(groupClass);
        expect(group).toHaveClass('group');
    });
    test('should have custom style', () => {
        const style = { color: '#ff0000' };
        const { getByTestId } = render(<Group style={style}/>);
        const group = getByTestId('Group-Container');
        expect(group).toHaveStyle('color: #ff0000');
    });
    test('should have children', () => {
        const groupText = 'Group';
        const { getByTestId } = render(<Group>{groupText}</Group>);
        const group = getByTestId('Group-Container');
        expect(group).toHaveTextContent(groupText);
    });
    test('should have data-testid', () => {
        const groupTestId = 'Group';
        const { getByTestId } = render(<Group dataTestId={groupTestId}/>);
        const group = getByTestId(groupTestId);
        expect(group).not.toBeNull();
    });
});
