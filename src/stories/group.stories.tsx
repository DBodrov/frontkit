import React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '../components/Button';
import { Group } from '../components/Group';
import { Div } from '../__tests__/Group/Div';

storiesOf('Group', module).add(
    'simple group',
    () => (
        <Group>
            <Div>
                <Div />
                <Div />
                <Div />
            </Div>
            <Div />
            <Div />
        </Group>
    ),
    { info: { inline: true } },
);
storiesOf('Button', module).add('simple button', () => <Button>Отправить</Button>, { info: { inline: true } });
