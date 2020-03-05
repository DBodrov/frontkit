import React from 'react';

const defaultTheme = {
    mainColor: '#69A6F1',
    linkColor: '#4B8BDA',
    btnTextColor: '#F2F2F2',
    loaderColor: '#69A6F1',
};

export type ThemeTypes = typeof defaultTheme;

export const ThemeContext = React.createContext<ThemeTypes>(defaultTheme);

interface ThemeProviderProps {
    children: React.ReactNode | ReadonlyArray<React.ReactNode>;
    value: Partial<ThemeTypes>;
}

export function ThemeProvider({ value, children }: ThemeProviderProps): JSX.Element {
    const colors = { ...defaultTheme, ...value, loaderColor: value.loaderColor || value.mainColor };
    return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>;
}
