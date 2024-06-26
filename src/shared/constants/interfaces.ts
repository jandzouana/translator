import { LoadingStates } from "./enums";

export interface StateChimeraApi {
    currentTranslation : string,
    status: LoadingStates.idle | LoadingStates.loading | LoadingStates.succeeded | LoadingStates.failed,
    errorMessage: string
}

export interface StateTranslation {
    textInput: string,
    textOutput: string,
    inputLanguage : string,
    outputLanguage : string,
    tone : string
}

export interface CompletionMessage {
    role: string;
    content: string;
}
