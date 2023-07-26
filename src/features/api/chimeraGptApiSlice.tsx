import {createTag} from "../../util";
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import getCompletion from './api';
import {AppDispatch, RootState} from '../../store';
import {State} from '../../constants/interfaces';
import {LoadingStates} from '../../constants/enums';

const disableApi = true;
const tag = createTag("chimeraGptApi");


// TODO: Move?
// TODO: Create enums


const initialState : State = {
    currentTranslation: "",
    status: LoadingStates.idle
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
                state.status = LoadingStates.loading;
            })
            .addCase(fetchTranslation.fulfilled, (state: State, action: PayloadAction<string>) => {
                state.status = LoadingStates.succeeded;
                state.currentTranslation = action.payload;
                console.log(tag + "Success. Payload: " + action.payload);
            })
            .addCase(fetchTranslation.rejected, (state: State) => {
                state.status = LoadingStates.failed;
            });
    }
});

// export const { addTodo } = apiSlice;
export const selectCurrentTranslation = (state : RootState) => state.chimeraApi.currentTranslation;
export const selectStatus = (state : RootState) => state.chimeraApi.status;

export default  apiSlice.reducer;
