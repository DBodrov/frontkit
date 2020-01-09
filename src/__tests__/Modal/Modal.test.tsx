import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Modal } from '../../components/Modal';

class TestComp extends React.Component {
    state = {
        isOpen: false,
    };

    handleClose = () => this.setState({ isOpen: false });
    handleOpen = () => this.setState({ isOpen: true });

    render():
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string
        | number
        | {}
        | React.ReactNodeArray
        | React.ReactPortal
        | boolean
        | null
        | undefined {
        const { isOpen } = this.state;
        return (
            <div>
                <div data-testid="div2"/>
                <div onClick={this.handleOpen} data-testid="div"/>
                {isOpen && (
                    <Modal onClose={this.handleClose}>
                        <span>123</span>
                    </Modal>
                )}
            </div>
        );
    }
}

describe('<Modal />', () => {
    test('should render an Modal element', () => {
        const modalTestId = 'Modal';
        const mockFunc = jest.fn();
        const { getByTestId } = render(
            <Modal onClose={mockFunc}>
                <span>123</span>
            </Modal>,
        );
        const modal = getByTestId(modalTestId);
        expect(modal).not.toBeNull();
    });
    test('should render an Modal element', () => {
        const { getByTestId } = render(
            <TestComp/>,
        );
        const elementClickToOpen = getByTestId('div');
        expect(()=>getByTestId('Modal')).toThrow();
        expect(elementClickToOpen).not.toBeNull();
        fireEvent.click(elementClickToOpen);
        const modal = getByTestId('Modal');
        expect(modal).not.toBeNull();
    });
});
