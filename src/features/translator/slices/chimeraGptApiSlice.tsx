import { createTag } from "../../../shared/utils/util";
import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import getCompletion from '../api/chimeraApi';
import { AppDispatch, RootState } from '../../../shared/store';
import { StateChimeraApi } from '../../../shared/constants/interfaces';
import { LoadingStates } from '../../../shared/constants/enums';

const disableApi : boolean = true;
const tag : string = createTag("chimeraGptApi");

const initialState : StateChimeraApi = {
    currentTranslation: "",
    status: LoadingStates.idle,
    errorMessage: ""
};

export const fetchTranslation = createAsyncThunk<string, string, {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    state: StateChimeraApi
    extra: {
        jwt: string
    }
    rejectWithValue : any
    }>('translations/fetchTranslation', async (input, thunkApi) => {
    if(disableApi) return "Disabled";
    console.log(tag + "Getting translation...");
    try {
        const requestMessage = input;
        const response: string = await getCompletion(requestMessage, false);
        console.log(tag + "Response: " + response);
        return response;
    }
    catch (e : any) {
        // Handle the error and return a rejected action using rejectWithValue
        const errorMessage = e.message; // Or any other error-related data you want to include
        return thunkApi.rejectWithValue(errorMessage);
    }
});

const apiSlice : any = createSlice({
    name: 'translations',
    initialState,
    reducers: {
        clearCurrentTranslation: (state : StateChimeraApi) => { // state, action
            state.currentTranslation = "";
            console.log(tag + "dispatched clearCurrentTranslation");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTranslation.pending, (state: StateChimeraApi) => {
                state.status = LoadingStates.loading;
            })
            .addCase(fetchTranslation.fulfilled, (state: StateChimeraApi, action: PayloadAction<string>) => {
                state.status = LoadingStates.succeeded;
                state.currentTranslation = action.payload;
                console.log(tag + "Success. Payload: " + action.payload);
            })
            .addCase(fetchTranslation.rejected, (state: StateChimeraApi, action: PayloadAction<any>) => {
                state.status = LoadingStates.failed;
                state.errorMessage = action.payload;
                console.log(tag + "Failed to get translation: " + action.payload);
            });
    }
});

export const { clearCurrentTranslation } = apiSlice.actions;
export const selectCurrentTranslation = (state : RootState) => state.chimeraApi.currentTranslation;
export const selectStatus = (state : RootState) => state.chimeraApi.status;
export const selectApiErrorMsg = (state : RootState) => state.chimeraApi.errorMessage;
export default apiSlice.reducer;
