const model = "gpt-3.5-turbo-16k"; // TODO: Move

// method: 'POST',
//     headers: {
//     'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
// },
// body: JSON.stringify({
//     'model': model,
//     messages: messages
// })

const msg = "2+2";
const messages : Array<string> = [];
messages.push(msg);

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getCompletion from './api';

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

export const fetchTranslation = createAsyncThunk<string, void>('translations/fetchTranslations', async () => {
    console.log("[chimerGptSlice] :: Getting translation...");
    const response : string = await getCompletion("2 + 2", false);
    console.log("[chimerGptSlice] :: Response: " + response);
    return response;
});

const apiSlice = createSlice({
    name: 'translations',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            // state.currentTranslation = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTranslation.pending, (state: State) => {
                state.status = 'loading';
            })
            .addCase(fetchTranslation.fulfilled, (state: State, action: any) => {
                state.status = 'succeeded';
                state.currentTranslation = action.payload;
            })
            .addCase(fetchTranslation.rejected, (state: State) => {
                state.status = 'failed';
            });
    }
    //     {
    //     [fetchTranslation.pending]: (state : State, action : any) => {
    //         state.status = 'loading';
    //     },
    //     [fetchTranslation.fulfilled]: (state : State, action : any) => {
    //         state.status = 'succeeded';
    //         state.currentTranslation = action.payload;
    //     }
    // }
});

// export const { addTodo } = apiSlice;
export const selectCurrentTranslation = (state : State) => state.currentTranslation;
export const selectStatus = (state : State) => state.status;

export default  apiSlice.reducer;
