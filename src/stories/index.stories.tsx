import React from 'react';

// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Header } from '../components/Header/Header';

storiesOf('Header', module).add('simple header', () => <Header>Some header</Header>, { info: { inline: true } });
