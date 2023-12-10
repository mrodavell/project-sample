import { createContext, useContext } from 'react';

export const HomePageContext = createContext();

export function useHomePage() {
    return useContext(HomePageContext);
}