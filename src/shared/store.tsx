import { configureStore } from '@reduxjs/toolkit';
import apiSlice from "../features/translator/slices/chimeraGptApiSlice";
import translationSlice from "../features/translator/slices/translationTextsSlice";

const store : any = configureStore({
    reducer : {
        chimeraApi: apiSlice,
        translation: translationSlice
        // textInput
        // textOutput, api?
        // inputLanguage
        // outputLanguage
        // array of messages for chimera
    }
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store;
