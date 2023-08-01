import React, {useEffect, useState} from 'react';
import {Color, TranslateCardType} from "../../../shared/constants/enums";
import { LanguageDropdownHeader, LanguageDropdownBody } from "./LanguageDropdown/LanguageDropdown";
import {languages} from "../../../shared/constants/constants";

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
    const [isOpen, setIsOpen] = useState(false);
    // console.log("isOpen: " + isOpen);
    useEffect(()=>{
        // console.log("text to display: " + textToDisplay + ". Type: " + (type === TranslateCardType.Output) ? "out" : "in");
        setTextValue(textToDisplay);
    }, [textToDisplay])

    function handleLanguageDropdownChange(language : string, type : TranslateCardType) {
        if(handleLanguageChange) handleLanguageChange(language, type);
        setIsOpen(false);
    }

    function handleTextAreaChange(event : any) {
        const msg = event.target.value ? event.target.value : "";
        handleTextChange(msg);
    }

    function handleHeaderClick(isOpen : true){
        setIsOpen(isOpen);
    }

    return(
        <div className={`translator-card ${type === TranslateCardType.Output ? "output-card-container" : "input-card-container"}`}>
            <LanguageDropdownHeader type={type}
                                    optionToDisplay={language}
                                    handleHeaderClick={handleHeaderClick}
                                    />
            <LanguageDropdownBody type={type}
                                  optionToDisplay={language}
                                  languages={languages}
                                  handleDropdownChange={handleLanguageDropdownChange}
                                  isOpen={isOpen}
            />
            <textarea disabled={type === TranslateCardType.Output}
                      autoComplete="off"
                      className={`translator-card--textarea disable-focus
                                ${isOpen? "hide" : ""}
                                ${type === TranslateCardType.Output ? "translator-card--textarea--output red-scrollbar" : "blue-scrollbar"}`}
                      value={textValue}
                      onChange={handleTextAreaChange}
                      placeholder={type === TranslateCardType.Output ? "" : "What would you like to translate?"}
            />
            <div className={`translator-card--icon-container ${isOpen? "hide" : ""}`}></div>
        </div>
    )
}

export default TranslatorCard;
