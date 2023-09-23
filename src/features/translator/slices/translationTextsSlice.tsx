import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StateTranslation} from "../../../shared/constants/interfaces";
import {RootState} from "../../../shared/store";
import {createTag} from "../../../shared/utils/util";
import {Root} from "react-dom/client";
import {defaultTone} from "@/shared/constants/constants";

const tag = createTag("translationTextsSlice");

const initialState : StateTranslation = {
    textInput: "",
    textOutput: "",
    inputLanguage : "",
    outputLanguage : "",
    translation: "",
    tone : defaultTone
};

const slice : any = createSlice({
    name: 'translationTexts',
    initialState,
    reducers: {
        setTranslation (state : StateTranslation, action : any){
          state.translation = action.payload;
        },
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
        setTone (state : StateTranslation, action : any){
            state.tone = action.payload;
        }
    },
});

export const { setTextInput, setTextOutput, setInputLanguage, setOutputLanguage, setTone, setTranslation } = slice.actions;
export const selectTextInput = (state : RootState) => state.translation.textInput;
export const selectTextOutput = (state : RootState) => state.translation.textOutput;
export const selectInputLanguage = (state : RootState) => state.translation.inputLanguage;
export const selectOutputLanguage = (state : RootState) => state.translation.outputLanguage;
export const selectTone = (state : RootState) => state.translation.tone;
export const selectTranslation = (state : RootState) => state.translation.translation;

export default slice.reducer;
