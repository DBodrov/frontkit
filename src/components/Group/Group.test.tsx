import React from 'react';
import ReactDOM from 'react-dom';
import { TestDiv } from '../TestDiv/TestDiv';
import { Group } from './Group';

it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Group>
            <TestDiv>
                <TestDiv />
                <TestDiv />
                <TestDiv />
            </TestDiv>
            <TestDiv />
            <TestDiv />
        </Group>,
        div,
    );
    expect(div).toMatchSnapshot();
});
