import React, {useEffect, useRef} from 'react';
import {
    clearCurrentTranslation,
    fetchTranslation,
    selectApiErrorMsg,
    selectCurrentTranslation,
    selectStatus,
} from "./slices/chimeraGptApiSlice";
import {
    selectInputLanguage,
    selectOutputLanguage,
    selectTextInput,
    selectTextOutput,
    setInputLanguage,
    setOutputLanguage,
    setTextInput,
    setTextOutput
} from "./slices/translationTextsSlice";
import {useDispatch, useSelector} from "react-redux";
import {createTag} from "../../shared/utils/util";
import {LoadingStates, TranslateCardType} from "../../shared/constants/enums";
import './styles/translator.css';
import TranslatorCard from "./components/TranslatorCard";
import CircleButton from "../../shared/components/buttons/CircleButton";
import switchIcon from '../../assets/switch.svg';
import SquareButton from "../../shared/components/buttons/SquareButton";

interface Props {

}
const Translator : React.FC<Props> = (props = {}) => {
    const tag = createTag("Translator");
    // console.log(tag + "top");

    const dispatch = useDispatch();

    const lastTranslationText = useRef("");
    const lastInputLanguage = useRef("");
    const lastOutputLanguage = useRef("");

    // TODO: Move?
    const defaultLanguages = {
        input: "English",
        output: "Spanish"
    }

    // useEffect(()=>{
    //
    // }, [dispatch]);
    const textInput = useSelector(selectTextInput);
    const textOutput = useSelector(selectTextOutput);
    const inputLanguage = useSelector(selectInputLanguage);
    const outputLanguage = useSelector(selectOutputLanguage);

    const currentTranslation = useSelector(selectCurrentTranslation);
    const currentStatus = useSelector(selectStatus);
    const apiErrorMsg = useSelector(selectApiErrorMsg);

    //console.log(tag + "Current translation: " + currentTranslation);

    useEffect(()=>{
        dispatch(setOutputLanguage(defaultLanguages.output));
        dispatch(setInputLanguage(defaultLanguages.input));
    }, [])

    useEffect(()=>{
        console.log(tag + "Setting current translation: " + currentTranslation);
        if(!currentTranslation) return;
        dispatch(setTextOutput(currentTranslation));
    }, [currentTranslation])

    function generateRequestMessage(input : string){
        const msg = `Translate the following from ${inputLanguage} to ${outputLanguage}: ${input}`;
        console.log(tag + "Request message: " + msg);
        return msg;
    }

    function handleTranslateBtnClick() {
        if(textInput.length !== 0 && (textInput !== lastTranslationText.current
            || inputLanguage !== lastInputLanguage.current
            || outputLanguage !== lastOutputLanguage.current
        )){
            //@ts-ignore
            dispatch(fetchTranslation(generateRequestMessage(textInput)));
            console.log(tag + "Current translation: " + textInput + " Last: " + lastTranslationText.current);
            lastTranslationText.current = textInput;
            lastInputLanguage.current = inputLanguage;
            lastOutputLanguage.current = outputLanguage;
            // TODO: Needed?
            dispatch(clearCurrentTranslation());
        }
    }

    function handleTextInputChange(text : string){
        dispatch(setTextInput(text));
        // console.log(tag + text);
    }

    function handleLanguageChange(language : string, type : TranslateCardType){
        if(type === TranslateCardType.Input){
            dispatch(setInputLanguage(language));
        }
        else dispatch(setOutputLanguage(language));
    }

    function handleSwitchButtonPress(){
        // console.log(tag + "handleSwitchPress " + "in: " + textInput + " out: " + textOutput);
        const temp = textInput.slice();
        dispatch(setTextInput(textOutput)); // doesn't work when empty
        dispatch(setTextOutput(temp));
        // lastTranslationText.current = ""; // TODO: Good?
        const temp2 = inputLanguage.slice();
        dispatch(setInputLanguage(outputLanguage));
        dispatch(setOutputLanguage(temp2));
    }

    return(
        <div id={"translator-container"}>
            <div id={"translator-container--main"}>
                <TranslatorCard type={TranslateCardType.Input}
                                handleTextChange={handleTextInputChange}
                                handleLanguageChange={handleLanguageChange}
                                language={inputLanguage}
                                textToDisplay={textInput}/>
                <CircleButton id={"switch-languages-button"}
                              switchIcon={switchIcon}
                              enablePress={false}
                              handlePress={handleSwitchButtonPress}
                />
                <TranslatorCard
                    type={TranslateCardType.Output}
                    handleLanguageChange={handleLanguageChange}
                    textToDisplay={textOutput}
                    language={outputLanguage}
                />
            </div>
            <div id={"translator-container--bottom"}>
                <SquareButton disabled={currentStatus === LoadingStates.loading}
                              handlePress={handleTranslateBtnClick} text={"Translate"} />
            </div>
        </div>

    );
}

// <h2>{currentStatus === LoadingStates.succeeded && currentTranslation}</h2>
// <h2>Current Status: {currentStatus}</h2>
// <h2>{currentStatus === LoadingStates.failed && apiError}</h2>
export default Translator;
