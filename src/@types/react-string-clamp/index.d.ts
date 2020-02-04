import React from 'react';

declare module 'react-string-clamp' {
    type TextClamp = React.ComponentType<{
        lines: number;
        className?: string;
        element?: string;
        text: string;
    }>;
    export default TextClamp;
}
