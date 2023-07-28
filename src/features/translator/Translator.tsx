import React, {useState, useEffect, useRef} from 'react';
import { fetchTranslation } from "./slices/chimeraGptApiSlice";
import { selectCurrentTranslation, selectStatus, selectApiError } from "./slices/chimeraGptApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { createTag} from "../../shared/utils/util";
import {LoadingStates, TranslateCardType} from "../../shared/constants/enums";
import './styles/translator.css';
import TranslatorCard from "./components/TranslatorCard";
import CircleButton from "../../shared/components/buttons/CircleButton";
import switchIcon from '../../assets/switch.svg';

interface Props {

}
const Translator : React.FC<Props> = (props = {}) => {
    const tag = createTag("Translator");
    // console.log(tag + "top");

    const dispatch = useDispatch();
    // TODO: Create slices for states
    const [textInput, setTextInput] = useState("");
    const [textOutput, setTextOutput] = useState("");

    const lastTranslationText = useRef("");

    // useEffect(()=>{
    //
    // }, [dispatch]);

    const currentTranslation = useSelector(selectCurrentTranslation);
    const currentStatus = useSelector(selectStatus);
    const apiErrorMsg = useSelector(selectApiError);

    console.log(tag + "Current translation: " + currentTranslation);

    useEffect(()=>{
        console.log(tag + "Setting current translation: " + currentTranslation);
        if(!currentTranslation) return;
        setTextOutput(currentTranslation);
    }, [currentTranslation])

    function handleClick() {
        if(textInput.length !== 0 && textInput !== lastTranslationText.current){
            //@ts-ignore
            dispatch(fetchTranslation(textInput));
            console.log(tag + "Current translation: " + textInput + " Last: " + lastTranslationText.current);
            lastTranslationText.current = textInput;
        }
    }

    function handleInputChange(text : string){
        setTextInput(text);
        //console.log(tag + text);
    }

    function handleSwitchButtonPress(){
        const temp = textInput;
        setTextInput(textOutput);
        setTextOutput(temp);
        // lastTranslationText.current = ""; // TODO: Good?
    }

    return(
        <div id={"translator-container"}>
            <div id={"translator-container--main"}>
                <TranslatorCard type={TranslateCardType.Input} handleTextChange={handleInputChange} textToDisplay={textInput}/>
                <CircleButton id={"switch-languages-button"}
                              switchIcon={switchIcon}
                              enablePress={false}
                              handlePress={handleSwitchButtonPress}
                />
                <TranslatorCard type={TranslateCardType.Output} textToDisplay={textOutput}/>
            </div>
            <div id={"translator-container--bottom"}>
                {/*TODO: Make into component*/}
                <button disabled={currentStatus === LoadingStates.loading} className={"square-button"} onClick={handleClick}>Translate</button>
            </div>
        </div>

    );
}

// <h1>Hello World</h1>
// <h2>{currentStatus === LoadingStates.succeeded && currentTranslation}</h2>
// <h2>Current Status: {currentStatus}</h2>
// <h2>{currentStatus === LoadingStates.failed && apiError}</h2>
export default Translator;
