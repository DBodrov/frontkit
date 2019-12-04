import React from 'react';

export type ThemeTypes = {
    styles?: {
        mainColor?: string;
        linkColor?: string;
    };
    className?: string;
};

export const ThemeContext = React.createContext<ThemeTypes>({});

export const ThemeProvider = ThemeContext.Provider;
