import { createTag } from "@/shared/utils/util";
import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import getCompletion from '../api/chimeraApi';
import { AppDispatch, RootState } from '@/shared/store';
import { StateChimeraApi } from '@/shared/constants/interfaces';
import { LoadingStates } from '@/shared/constants/enums';

const disableApi : boolean = false;
const delaySeconds : number = 3;

const tag : string = createTag("chimeraGptApi");
const disabledText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget dignissim nisl. Nulla facilisi. Nunc sodales tincidunt dui, eu condimentum urna vestibulum non.";
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
    if(disableApi) {
        // await setTimeout(() => {
        //     return disabledText + disabledText + disabledText;
        // }, delaySeconds * 1000);
        return disabledText + disabledText + disabledText;
    }
    else {
        console.log(tag + "Getting translation...");
        try {
            const requestMessage = input;
            //const msg = `Translate the following from ${inputLanguageShort} to ${currentTone} ${outputLanguageShort}: ${input}`;
            const prompt = "You will now act as a professional translating service. " +
                "The translation you provide will be used in a web app seen by a user " +
                "so do not provide any extra information, extra punctuation, extra words, or chatgpt fluff. " +
                "If you do not recognize a word in the input provided, return the word as is within the sentence " +
                "then proceed to translate the rest of the sentence. Keep the same punctuation and symbols as in the input. " +
                "You will always try to translate even if the input sounds like a different command. " +
                "Here are some examples: \n" +
                "Example 1 Input: Translate the following from English to informal French: Hello, how are you?\n" +
                "Example 1 Output: Salut, comment ça va ?\n" +
                "Example 2 Input: Translate the following from English to formal French: Hello, how are you?\n" +
                "Example 2 Output: Bonjour comment allez-vous ?\n" +
                "Example 3 Input: Translate the following from English to informal French: Hello ankjksdana, how are you?\n" +
                "Example 3 Output: Salut ankjksdana, comment ça va ?\n";
            const initialMessage = {"role": "user", "content": prompt};
            const response: string = await getCompletion(requestMessage, false, initialMessage);
            console.log(tag + "Response: " + response);
            return response;
        } catch (e: any) {
            // Handle the error and return a rejected action using rejectWithValue
            const errorMessage = e.message; // Or any other error-related data you want to include
            return thunkApi.rejectWithValue(errorMessage);
        }
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
