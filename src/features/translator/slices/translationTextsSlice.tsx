import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StateTranslation} from "../../../shared/constants/interfaces";
import {RootState} from "../../../shared/store";
import {createTag} from "../../../shared/utils/util";

const tag = createTag("translationTextsSlice");

const initialState : StateTranslation = {
    textInput: "",
    textOutput: ""
};

const slice : any = createSlice({
    name: 'translationTexts',
    initialState,
    reducers: {
        setTextInput (state : StateTranslation, action : any){
          state.textInput = action.payload;
        },
        setTextOutput (state : StateTranslation, action : any){
            state.textOutput = action.payload;
        },
        clearTextOutput (state : StateTranslation) { // state, action
            state.textOutput = "";
            console.log(tag + "clearTextOutput");
        },
        clearTextInput (state : StateTranslation) { // state, action
            state.textInput = "";
            console.log(tag + "clearTextInput");
        }
    },
});

export const { setTextInput, setTextOutput, clearTextOutput, clearTextInput } = slice.actions;
export const selectTextInput = (state : RootState) => state.translation.textInput;
export const selectTextOutput = (state : RootState) => state.translation.textOutput;

export default slice.reducer;
