import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Dropdown } from '../';

const data = ['123', '12321312', '789', '123213'];

storiesOf('Dropdown', module).add(
    'base',
    () => (
        <Dropdown
            data={data}
            getElement={_ => <div>{_}</div>}
            inputThreshold={1}
            isSuitable={(s, input) => s.startsWith(input)}
            resultThreshold={2}
            onSelect={action('selected')}
        />
    ),
    { info: { inline: true } },
);
