import { withInfo } from '@storybook/addon-info';
import { addDecorator, configure } from '@storybook/react';
import closestPolyfill from 'element-closest';
closestPolyfill(window);

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
    // @ts-ignore
    addDecorator(withInfo);
    req.keys().forEach(req);
}

configure(loadStories, module);
