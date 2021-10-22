import React from 'react';
import {Button, Loader} from '@a3/uikit';
import {ExamplePage, Viewarea, PageTitle} from 'site/components/layout';
import {ChatIcon} from 'site/assets/icons';

export function ButtonPage() {
  return (
    <ExamplePage>
      <PageTitle>Buttons</PageTitle>
      <Viewarea css={{flexFlow: 'row nowrap'}}>
        <article css={{display: 'flex', flexFlow: 'column nowrap', gap: 10}}>
          <Button>Default кнопка</Button>
          <Button variant="secondary">Secondary кнопка</Button>
          <Button outline>Default кнопка</Button>
          <Button outline variant="secondary">
            Secondary кнопка
          </Button>
          <Button outline variant="primary" css={{width: 250}} disabled>
            Default кнопка выключена
          </Button>
        </article>
        <article css={{display: 'flex', flexFlow: 'column nowrap', gap: 10}}>
          <Button>
            <ChatIcon />
            <span css={{paddingLeft: 4}}>Поговорить</span>
          </Button>
          <Button outline css={{':hover': {backgroundColor: '#fff'}}} disabled>
            <Loader css={{width: '100%', height: '100%'}} />
          </Button>
        </article>
      </Viewarea>
    </ExamplePage>
  );
}
