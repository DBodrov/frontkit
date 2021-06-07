import React from 'react';

import { storiesOf } from '@storybook/react';
import { Checkbox } from '../components/Checkbox';
import { RootContainerProvider } from '../components/RootContainer';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    mainColor: '#8000ff',
};
const wrapperRef = React.createRef<HTMLDivElement>();
storiesOf('Checkbox', module).add(
    'simple checkbox',
    () => (
        <RootContainerProvider value={wrapperRef}>
            <div ref={wrapperRef} style={{ width: '200px' }}>
                <Checkbox Label="Клик" hintText="23434кц312312 3123 123 123 123 1231231 123123 123 к" />
                <Checkbox colorizedHelpIcon Label="Клик" hintText="23434кц312312 3123 123 123 123 1231231 123123 123 к" />
            </div>
        </RootContainerProvider>
    ),
    { info: { inline: true } },
);
storiesOf('Checkbox', module).add('simple checkbox no label', () => <Checkbox />, { info: { inline: true } });
storiesOf('Checkbox', module)
    .add(
        'Theme checkbox',
        () => (
            <ThemeProvider value={theme}>
                <Checkbox Label="Клик" />
            </ThemeProvider>
        ),
        { info: { inline: true, propTablesExclude: [ThemeProvider] } },
    )
    .add('checkbox with label component', () => <Checkbox Label={() => <>Клик</>} />, {
        info: { inline: true },
    });
