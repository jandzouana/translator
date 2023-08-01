import React, {useEffect, useState} from 'react';
import {Color, IconType, TranslateCardType} from "../../../shared/constants/enums";
import {LanguageDropdownBody, LanguageDropdownHeader} from "./LanguageDropdown/LanguageDropdown";
import {languages} from "../../../shared/constants/constants";
import ClickableIcon from "../../../shared/components/buttons/ClickableIcon";
import copyIcon from "../../../assets/copy-file.svg";
import deleteIcon from "../../../assets/x.svg";

interface Props {
    type: TranslateCardType,
    handleTextChange? : (text : string) => void,
    handleIconClick? : (icon : IconType, type : TranslateCardType) => void,
    textToDisplay : string,
    language : string,
    handleLanguageChange? : (text : string, type : TranslateCardType) => void
}

const TranslatorCard : React.FC<Props> = (props = {
    type:TranslateCardType.Input,
    textToDisplay: "", language: "",
    handleLanguageChange: (text : string, type : TranslateCardType) =>{},
}) => {
    const { type, handleTextChange, textToDisplay, language, handleLanguageChange, handleIconClick } = props;
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
        if(handleTextChange) handleTextChange(msg);
    }

    function handleIconPress(icon : IconType){
        if(handleIconClick) handleIconClick(icon, type);
    }

    function handleHeaderClick(isOpen : boolean){
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
            <div className={"translator-card--textarea-container"}>
                <textarea disabled={type === TranslateCardType.Output}
                          autoComplete="off"
                          className={`translator-card--textarea disable-focus
                    ${isOpen? "hide" : ""}
                    ${type === TranslateCardType.Output ? "translator-card--textarea--output red-scrollbar" : "blue-scrollbar"}`}
                          value={textValue}
                          onChange={handleTextAreaChange}
                          placeholder={type === TranslateCardType.Output ? "" : "What would you like to translate?"}
                />
                {type === TranslateCardType.Input &&
                    <div className={`translator-card--textarea-btns ${!textToDisplay ? 'hide' : ''}`}>
                        <ClickableIcon icon={deleteIcon}
                                       handlePress={handleIconPress}
                                       color={Color.Blue}
                                       iconRatio={35}
                                       iconType={IconType.Delete}/>
                    </div>
                }
            </div>
            <div className={`translator-card--icon-container ${isOpen? "hide" : ""}`}>
                <ClickableIcon icon={copyIcon}
                               handlePress={handleIconPress}
                               color={type === TranslateCardType.Input? Color.Blue : Color.White}
                               iconType={IconType.Copy}/>
            </div>
        </div>
    )
}

export default TranslatorCard;
