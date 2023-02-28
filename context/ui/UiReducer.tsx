import { UiState } from "./UiProvider";

type UiActionType =
    | { type: '[Ui] - ToggleMenu' }

export const uiReducer = (state: UiState, action: UiActionType): any => {
    switch (action.type) {
        case '[Ui] - ToggleMenu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }
            break;
        default:
            break;
    }
}