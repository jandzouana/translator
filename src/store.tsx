import { configureStore } from '@reduxjs/toolkit';
import apiSlice from "./features/api/chimeraGptApiSlice";

const store : any = configureStore({
    reducer : {
        chimeraApi: apiSlice
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
