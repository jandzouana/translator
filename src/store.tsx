import { configureStore } from '@reduxjs/toolkit';
import apiSlice from "./features/api/chimeraGptApiSlice";

const store : any = configureStore({
    reducer : {
        chimerApi: apiSlice
        // status:
        // textInput
        // textOutput, api?
        // inputLanguage
        // outputLanguage
        // array of messages for chimera
    }
});

export default store;
