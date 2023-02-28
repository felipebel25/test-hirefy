import { createContext } from 'react';


export interface ContextProps {
     isMenuOpen: boolean;
     //methods
     toggleSideMenu: () => void
}
export const UiContext = createContext({} as ContextProps)