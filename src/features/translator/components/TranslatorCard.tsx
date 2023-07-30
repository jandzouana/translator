import React, {useEffect, useState} from 'react';
import {Color, TranslateCardType} from "../../../shared/constants/enums";
import LanguageDropdown from "../../../shared/components/dropdowns/LanguageDropdown/LanguageDropdown";

// TODO: Move later
interface Props {
    type: TranslateCardType,
    handleTextChange? : any
    textToDisplay : string
}

const TranslatorCard : React.FC<Props> = (props = {type:TranslateCardType.Input, textToDisplay: ""}) => {
    const { type, handleTextChange, textToDisplay } = props;
    const [textValue, setTextValue] = useState('');

    useEffect(()=>{
        // console.log("text to display: " + textToDisplay + ". Type: " + (type === TranslateCardType.Output) ? "out" : "in");
        setTextValue(textToDisplay);
    }, [textToDisplay])

    function handleDropdownChange(event : any) {
        // setSelectedOption(event.target.value);
    }

    function handleTextAreaChange(event : any) {
        const msg = event.target.value ? event.target.value : "";
        handleTextChange(msg);
    }

    return(
        <div className={`translator-card ${type === TranslateCardType.Output ? "output-card-container" : "input-card-container"}`}>
            <LanguageDropdown type={type} optionToDisplay={type === TranslateCardType.Output ? "Spanish" : "English"}
                              handleDropdownChange={handleDropdownChange}
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
