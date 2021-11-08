import React from 'react';
import {Radio, Checkbox} from '@a3/uikit';
import {ExamplePage, Viewarea, PageTitle} from './ExamplePage';

export function RadioPage() {
  const [color, setColor] = React.useState('white');
  const [isAgree, setAgreement] = React.useState(false);

  return (
    <ExamplePage>
      <PageTitle>Radio button and Checkbox</PageTitle>
      <Viewarea>
        <form css={{backgroundColor: color}}>
          <fieldset>
            <legend>Choose form background color</legend>
            <Radio checked={color === 'white'} onChange={() => setColor('white')} value="white">
              White
            </Radio>
            <Radio checked={color === 'yellow'} onChange={() => setColor('yellow')} value="yellow">
              Yellow
            </Radio>
            <Radio
              checked={color === 'var(--color-primary)'}
              onChange={() => setColor('var(--color-primary)')}
              value="var(--color-primary)"
            >
              A3
            </Radio>
          </fieldset>
        </form>
        <Checkbox checked={isAgree} onChange={e => setAgreement(e.currentTarget.checked)}>
          <span onClick={() => setAgreement(s => !s)}>Не читал, но одобряю </span>
        </Checkbox>
      </Viewarea>
    </ExamplePage>
  );
}
