import React, {useEffect, useState} from 'react';
import {TranslateCardType} from "../../../shared/constants/enums";

// TODO: Move later
interface Props {
    type: TranslateCardType,
    handleTextChange? : any
    textToDisplay? : string
}

const TranslatorCard : React.FC<Props> = (props = {type:TranslateCardType.Input}) => {
    const { type, handleTextChange, textToDisplay } = props;
    const [selectedOption, setSelectedOption] = useState('');
    const [textValue, setTextValue] = useState('');

    useEffect(()=>{
        if(!textToDisplay) return
        else if(textToDisplay.length === 0) return;
        else{
            setTextValue(textToDisplay);
        }
    }, [textToDisplay])
    function handleDropdownChange(event : any) {
        setSelectedOption(event.target.value);
    }

    function handleTextAreaChange(event : any) {
        setTextValue(event.target.value);
        handleTextChange(event.target.value);
    }

    return(
        <div className={`translator-card ${type === TranslateCardType.Output ? "output-card-container" : "input-card-container"}`}>
            <select className="translator-card--dropdown" value={selectedOption} onChange={handleDropdownChange}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <textarea disabled={type === TranslateCardType.Output}
                      className={`translator-card--textarea 
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
