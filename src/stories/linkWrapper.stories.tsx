import React from 'react';

import { storiesOf } from '@storybook/react';
import { LinkWrapper } from '../components/LinkWrapper';
import { ThemeProvider, ThemeTypes } from '../components/ThemeProvider';

const theme: ThemeTypes = {
    styles: {
        linkColor: '#8000ff',
    },
};

storiesOf('LinkWrapper', module)
    .add('simple', () => <LinkWrapper>text</LinkWrapper>, { info: { inline: true } })
    .add(
        'Theme LinkWrapper',
        () => (
            <ThemeProvider value={theme}>
                <LinkWrapper>text</LinkWrapper>
            </ThemeProvider>
        ),
        { info: { inline: true, propTablesExclude: [ThemeProvider] } },
    );
