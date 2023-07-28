import { LoadingStates } from "./enums";

export interface StateChimeraApi {
    currentTranslation : string,
    status: LoadingStates.idle | LoadingStates.loading | LoadingStates.succeeded | LoadingStates.failed,
    errorMessage: string
}

export interface StateTranslation {
    textInput: string,
    textOutput: string
}
