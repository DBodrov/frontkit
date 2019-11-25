import * as React from 'react';

type Theme = {
    styles?: {
        color?: string;
        backgroundColor?: string;
    };
    className?: string;
};

export const ThemeContext = React.createContext<Theme>({});

export const ThemeProvider = ThemeContext.Provider;
