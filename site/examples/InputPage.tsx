import React from 'react';
import {Input, InputNumber, InputPhone} from '@a3/uikit';
import {ExamplePage, Viewarea, PageTitle} from './ExamplePage';

export function InputPage() {
  const [text, setText] = React.useState('');
  const [number, setNumber] = React.useState(null);
  const [phone, setPhone] = React.useState('');
  const [hasError, setError] = React.useState(false);
  const validation = () => {
    if (text === '000') {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <ExamplePage>
      <PageTitle>Input</PageTitle>
      <Viewarea>
        <div css={{width: 300}}>
          <label htmlFor="uncontrolled">Uncontrolled Input</label>
          <Input id="uncontrolled" />
        </div>
        <div css={{width: 300, paddingTop: 10}}>
          <label htmlFor="controlled">Controlled Input</label>
          <Input
            id="controlled"
            onChange={e => setText(e.target.value)}
            value={text}
            onBlur={validation}
            css={{borderColor: hasError ? 'var(--color-error) !important' : ''}}
          />
          <span css={{fontSize: 10, color: 'var(--color-text-secondary)'}}>type 000 for error style</span>
        </div>
        <div css={{width: 300, paddingTop: 10}}>
          <label htmlFor="number">Number Input</label>
          <InputNumber onChange={val => setNumber(val)} value={number} id="number" />
        </div>
        <div css={{width: 300, paddingTop: 10}}>
          <label htmlFor="phoneNumber">Phone Input</label>
          <InputPhone
            id="phoneNumber"
            onChange={val => setPhone(val)}
            value={phone}
            countryCode="+7"
            autoComplete="off"
            placeholder="(___) ___-__-__"
          />
        </div>
      </Viewarea>
    </ExamplePage>
  );
}
