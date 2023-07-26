import { createTag } from "../../util";
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import getCompletion from './api';
import {AppDispatch, RootState} from '../../store';
const disableApi = true;
const tag = createTag("chimeraGptApi");


// TODO: Move?
// TODO: Create enums
interface State {
    currentTranslation : string,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState : State = {
    currentTranslation: "",
    status: 'idle'
};



// TODO: Rewrite to take in param  async (msg: string) or take from current state
// TODO: Check for errors rejectWithValue
export const fetchTranslation = createAsyncThunk<string, void,   {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    state: State
    extra: {
        jwt: string
    }}>('translations/fetchTranslation', async () => {
    if(disableApi) return "Disabled";
    console.log(tag + "Getting translation...");
    const response : string = await getCompletion("2 + 2", false);
    console.log(tag + "Response: " + response);
    return response;
});

const apiSlice = createSlice({
    name: 'translations',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            // state.currentTranslation = action.payload;
            console.log(tag + "dispatched addTodo");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTranslation.pending, (state: State) => {
                state.status = 'loading';
            })
            .addCase(fetchTranslation.fulfilled, (state: State, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.currentTranslation = action.payload;
                console.log(tag + "Success. Payload: " + action.payload);
            })
            .addCase(fetchTranslation.rejected, (state: State) => {
                state.status = 'failed';
            });
    }
});

// export const { addTodo } = apiSlice;
export const selectCurrentTranslation = (state : RootState) => state.chimeraApi.currentTranslation;
export const selectStatus = (state : RootState) => state.chimeraApi.status;

export default  apiSlice.reducer;
