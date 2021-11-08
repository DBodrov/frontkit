import React from 'react';
import {H1, H2, H3, P, Span} from '@a3/uikit';
import {ExamplePage, Viewarea, PageTitle} from './ExamplePage';

export function TypographyPage() {
  return (
    <ExamplePage>
      <PageTitle>Typography</PageTitle>
      <Viewarea css={{gap: 20}}>
        <H1>H1. Heading - 1</H1>
        <H2>H2. Heading - 2</H2>
        <H3>H3. Heading - 3</H3>
        <P>P. Paragraph</P>
        <Span>Span. Just span</Span>
      </Viewarea>
    </ExamplePage>
  );
}
