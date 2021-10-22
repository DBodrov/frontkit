import React from 'react';
import {Loader, Button} from '@a3/uikit';
import {ExamplePage, Viewarea, PageTitle} from 'site/components/layout';

export function LoaderPage() {
  const [loaderType, setLoaderType] = React.useState(null);
  return (
    <ExamplePage>
      <PageTitle>Loader</PageTitle>
      <Viewarea css={{gap: 10}}>
        <Button onClick={() => setLoaderType('fullscreen')}>Show Fullscreen loader</Button>
        {loaderType === 'fullscreen' ? (
          <Loader fullscreen hasOverlay>
            <span>Refresh page for hidden loader...</span>
          </Loader>
        ) : null}
        <Button onClick={() => setLoaderType('no overlay')}>Fullscreen no overlay</Button>
        {loaderType === 'no overlay' ? (
          <Loader fullscreen>
            <span>Refresh page for hidden loader...</span>
          </Loader>
        ) : null}

        <div css={{border: '1px var(--color-border) solid', width: 30, height: 30}}>
          <Loader css={{width: 30, height: 30, fontSize: 10}} />
        </div>
      </Viewarea>
    </ExamplePage>
  );
}
