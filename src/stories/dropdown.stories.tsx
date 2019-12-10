import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Dropdown } from '../components/Dropdown';

const data = ['123', '12321312', '789', '123213'];

storiesOf('Dropdown', module).add(
    'base',
    () => (
        <Dropdown
            data={data}
            getElement={_ => <div>{_}</div>}
            inputThreshold={1}
            isSuitable={(s, input) => s.startsWith(input)}
            NotFound={() => <div>not found</div>}
            resultThreshold={2}
        />
    ),
    { info: { inline: true } },
);
