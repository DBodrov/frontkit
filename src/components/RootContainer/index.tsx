import React from 'react';

const defaultValue = React.createRef<HTMLDivElement>();

export const RootContainerContext = React.createContext<React.RefObject<HTMLDivElement>>(defaultValue);

export const RootContainerProvider = RootContainerContext.Provider;
