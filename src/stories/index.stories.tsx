// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '../components/Button';
import { Group } from '../components/Group';
import { Div } from '../__tests__/Group/Div';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { H1, H2 } from '../components/Header';

storiesOf('Headers', module)
    .add('H1 header', () => <H1>Large header</H1>, { info: { inline: true } })
    .add('H2 header', () => <H2>Medium header</H2>, { info: { inline: true } });
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
