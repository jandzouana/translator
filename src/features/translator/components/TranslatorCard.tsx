import React, {useEffect, useState} from 'react';
import {Color, TranslateCardType} from "../../../shared/constants/enums";
import LanguageDropdown from "../../../shared/components/dropdowns/LanguageDropdown/LanguageDropdown";

// TODO: Move later
interface Props {
    type: TranslateCardType,
    handleTextChange? : any,
    textToDisplay : string,
    language : string,
    handleLanguageChange? : any
}

const TranslatorCard : React.FC<Props> = (props = {
    type:TranslateCardType.Input, textToDisplay: "", language: "", handleLanguageChange: null}) => {
    const { type, handleTextChange, textToDisplay, language, handleLanguageChange } = props;
    const [textValue, setTextValue] = useState('');

    useEffect(()=>{
        // console.log("text to display: " + textToDisplay + ". Type: " + (type === TranslateCardType.Output) ? "out" : "in");
        setTextValue(textToDisplay);
    }, [textToDisplay])

    function handleLanguageDropdownChange(language : string, type : TranslateCardType) {
        if(handleLanguageChange) handleLanguageChange(language, type);
    }

    function handleTextAreaChange(event : any) {
        const msg = event.target.value ? event.target.value : "";
        handleTextChange(msg);
    }

    return(
        <div className={`translator-card ${type === TranslateCardType.Output ? "output-card-container" : "input-card-container"}`}>
            <LanguageDropdown type={type} optionToDisplay={language}
                              handleDropdownChange={handleLanguageDropdownChange}
                              languages={["English", "Spanish", "Cantonese", "Russian", "French"]}/>
            <textarea disabled={type === TranslateCardType.Output}
                      autoComplete="off"
                      className={`translator-card--textarea disable-focus
                                ${type === TranslateCardType.Output ? "translator-card--textarea--output" : ""}`}
                      value={textValue}
                      onChange={handleTextAreaChange}
                      placeholder={type === TranslateCardType.Output ? "" : "What would you like to translate?"}
            />
            <div className={"translator-card--icon-container"}></div>
        </div>
    )
}

export default TranslatorCard;
