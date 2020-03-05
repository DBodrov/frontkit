import { withInfo } from '@storybook/addon-info';
import { addDecorator, configure, addParameters } from '@storybook/react';
import closestPolyfill from 'element-closest';
closestPolyfill(window);

const customViewports = {
    375: {
        name: '375px',
        styles: {
            width: '375px',
            height: '963px',
        },
    },
    540: {
        name: '540px',
        styles: {
            width: '540px',
            height: '963px',
        },
    },
    767: {
        name: '767px',
        styles: {
            width: '767px',
            height: '963px',
        },
    },
    986: {
        name: '986px',
        styles: {
            width: '986px',
            height: '963px',
        },
    },
};

addParameters({
    viewport: { viewports: customViewports },
});

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
    // @ts-ignore
    addDecorator(withInfo);
    req.keys().forEach(req);
}

configure(loadStories, module);
