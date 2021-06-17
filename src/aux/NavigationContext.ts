import { createContext, MutableRefObject } from 'react';

export interface NavigationContextProps {
    [name:string]: MutableRefObject<any>,
}

const NavigationContext = createContext({} as NavigationContextProps);

export const NavigationContextProvider = NavigationContext.Provider;

export default NavigationContext;
