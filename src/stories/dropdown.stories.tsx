import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Dropdown } from '../components/Dropdown';

const data = ['123', '456', '789', '123213'];

storiesOf('Dropdown', module).add(
    'base',
    () => (
        <Dropdown
            data={data}
            More={() => <div>more</div>}
            Dimmer={React.Fragment}
            getElement={_ => <div>{_}</div>}
            inputThreshold={2}
            isSuitable={(s, input) => s.startsWith(input)}
            NotFound={() => <div>not found</div>}
            resultThreshold={3}
        />
    ),
    { info: { inline: true } },
);
