import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StateTranslation} from "../../../shared/constants/interfaces";
import {RootState} from "../../../shared/store";
import {createTag} from "../../../shared/utils/util";
import {Root} from "react-dom/client";

const tag = createTag("translationTextsSlice");

const initialState : StateTranslation = {
    textInput: "",
    textOutput: "",
    inputLanguage : "",
    outputLanguage : ""
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
        setInputLanguage (state : StateTranslation, action : any){
            //console.log(tag + "Setting input language");
            state.inputLanguage = action.payload;
        },
        setOutputLanguage (state : StateTranslation, action : any){
            state.outputLanguage = action.payload;
        },
    },
});

export const { setTextInput, setTextOutput, setInputLanguage, setOutputLanguage } = slice.actions;
export const selectTextInput = (state : RootState) => state.translation.textInput;
export const selectTextOutput = (state : RootState) => state.translation.textOutput;
export const selectInputLanguage = (state : RootState) => state.translation.inputLanguage;
export const selectOutputLanguage = (state : RootState) => state.translation.outputLanguage;

export default slice.reducer;
