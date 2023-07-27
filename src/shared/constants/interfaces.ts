import { LoadingStates } from "./enums";

export interface State {
    currentTranslation : string,
    status: LoadingStates.idle | LoadingStates.loading | LoadingStates.succeeded | LoadingStates.failed,
    errorMessage: string
}
