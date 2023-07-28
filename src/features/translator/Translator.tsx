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
import SquareButton from "../../shared/components/buttons/SquareButton";

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
        // console.log(tag + "handleSwitchPress " + "in: " + textInput + " out: " + textOutput);
        const temp = textInput.slice();
        setTextInput(textOutput); // doesn't work when empty
        setTextOutput(temp);
        // lastTranslationText.current = ""; // TODO: Good?
    }

    useEffect(() => {
        // This code will be executed after the state update is complete and the component has re-rendered
        console.log(tag + "handleSwitchPress " + "in: " + textInput + " out: " + textOutput);
    }, [textInput, textOutput]);

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
                <SquareButton disabled={currentStatus === LoadingStates.loading}
                              handlePress={handleClick} text={"Translate"} />
            </div>
        </div>

    );
}

// <h1>Hello World</h1>
// <h2>{currentStatus === LoadingStates.succeeded && currentTranslation}</h2>
// <h2>Current Status: {currentStatus}</h2>
// <h2>{currentStatus === LoadingStates.failed && apiError}</h2>
export default Translator;
