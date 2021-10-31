import React from 'react';
import {Input, InputNumber} from '@a3/uikit';
import {ExamplePage, Viewarea, PageTitle} from 'site/components/layout';

export function InputPage() {
  const [text, setText] = React.useState('');
  const [number, setNumber] = React.useState(null);
  const [ccNumber, setCCN] = React.useState('');
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
          <span>type 000 for error style</span>
        </div>
        <div css={{width: 300, paddingTop: 10}}>
          <label htmlFor="number">Number Input</label>
          <InputNumber onChange={val => setNumber(val)} value={number} id="number" />
        </div>
      </Viewarea>
    </ExamplePage>
  );
}
