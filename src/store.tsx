import {AnyAction, AsyncThunkAction, configureStore} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import apiSlice from "./features/api/chimeraGptApiSlice";

const store : any = configureStore({
    reducer : {
        chimeraApi: apiSlice
        // status:
        // textInput
        // textOutput, api?
        // inputLanguage
        // outputLanguage
        // array of messages for chimera
    }
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: (action : AnyAction) => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
// export const apiDispatch: (action : AsyncThunkAction<string, void, any>) => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>
export default store;
