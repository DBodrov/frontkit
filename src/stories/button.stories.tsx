import React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '../components/Button';

storiesOf('Button', module).add('simple button', () => <Button>Отправить</Button>, { info: { inline: true } });
