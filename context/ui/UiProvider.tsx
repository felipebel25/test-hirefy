import { FC, PropsWithChildren, useReducer } from 'react';
import { UiContext, uiReducer } from './index';
export interface UiState {
    isMenuOpen: boolean;
}
export const Ui_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}
export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);
    const toggleSideMenu = () => dispatch({ type: '[Ui] - ToggleMenu' })

    return (
        <UiContext.Provider
            value={{
                ...state,
                //methods
                toggleSideMenu
            }}
        >
            {children}
        </UiContext.Provider>
    )
}