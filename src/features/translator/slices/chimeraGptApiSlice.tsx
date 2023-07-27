import {createTag} from "../../../shared/utils/util";
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import getCompletion from '../api/chimeraApi';
import {AppDispatch, RootState} from '../../../shared/store';
import {State} from '../../../shared/constants/interfaces';
import {LoadingStates} from '../../../shared/constants/enums';

const disableApi = true;
const tag = createTag("chimeraGptApi");

const initialState : State = {
    currentTranslation: "",
    status: LoadingStates.idle,
    errorMessage: ""
};

export const fetchTranslation = createAsyncThunk<string, void, {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    state: State
    extra: {
        jwt: string
    }
    rejectWithValue : any
    }>('translations/fetchTranslation', async (_, thunkApi) => {
    if(disableApi) return "Disabled";
    console.log(tag + "Getting translation...");
    try {
        const response: string = await getCompletion("2 + 2", false);
        console.log(tag + "Response: " + response);
        return response;
    }
    catch (e : any) {
        // Handle the error and return a rejected action using rejectWithValue
        const errorMessage = e.message; // Or any other error-related data you want to include
        return thunkApi.rejectWithValue(errorMessage);
    }
});

const apiSlice = createSlice({
    name: 'translations',
    initialState,
    reducers: {
        addTodo: () => { // state, action
            // state.currentTranslation = action.payload;
            console.log(tag + "dispatched addTodo");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTranslation.pending, (state: State) => {
                state.status = LoadingStates.loading;
            })
            .addCase(fetchTranslation.fulfilled, (state: State, action: PayloadAction<string>) => {
                state.status = LoadingStates.succeeded;
                state.currentTranslation = action.payload;
                console.log(tag + "Success. Payload: " + action.payload);
            })
            .addCase(fetchTranslation.rejected, (state: State, action: PayloadAction<any>) => {
                state.status = LoadingStates.failed;
                state.errorMessage = action.payload;
                console.log(tag + "Failed to get translation: " + action.payload);
            });
    }
});

// export const { addTodo } = apiSlice;
export const selectCurrentTranslation = (state : RootState) => state.chimeraApi.currentTranslation;
export const selectStatus = (state : RootState) => state.chimeraApi.status;
export const selectApiError = (state : RootState) => state.chimeraApi.errorMessage;
export default  apiSlice.reducer;
