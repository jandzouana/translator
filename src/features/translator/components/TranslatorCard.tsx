import React, {useEffect, useState, useRef} from 'react';
import {Color, IconType, LoadingStates, TranslateCardType} from "@/shared/constants/enums";
import {LanguageDropdownBody, LanguageDropdownHeader} from "./LanguageDropdown/LanguageDropdown";
import {languages, maxCharLimit} from "@/shared/constants/constants";
import ClickableIcon from "../../../shared/components/buttons/ClickableIcon";
import copyIcon from "../../../assets/copy-file.svg";
import deleteIcon from "../../../assets/x.svg";
import arrowIcon from "../../../assets/down-arrow.svg";
import {createTag} from "@/shared/utils/util";
import Spinner from "@/shared/components/spinner/spinner";

interface Props {
    type: TranslateCardType,
    handleTextChange? : (text : string) => void,
    handleIconClick? : (icon : IconType, type : TranslateCardType) => void,
    textToDisplay : string,
    language : string,
    otherLanguage : string,
    handleLanguageChange? : (text : string, type : TranslateCardType) => void,
    showLoader ? : boolean,
    currentStatus ? : LoadingStates,
    mobile ? : boolean
}

const TranslatorCard : React.FC<Props> = (props = {
    type:TranslateCardType.Input,
    textToDisplay: "", language: "",
    otherLanguage : "",
    handleLanguageChange: (text : string, type : TranslateCardType) =>{},
}) => {
    const { type, currentStatus, mobile, handleTextChange, textToDisplay, language, otherLanguage, handleLanguageChange, handleIconClick, showLoader } = props;
    const tag = createTag("TranslatorCard");
    // if (type === TranslateCardType.Output) console.log(tag + "Show loader: " + showLoader + ". Type: " + type);
    const [textValue, setTextValue] = useState('');
    const cursorPositionRef = useRef(0);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // console.log("isOpen: " + isOpen);
    useEffect(()=>{
        // console.log("text to display: " + textToDisplay + ". Type: " + (type === TranslateCardType.Output) ? "out" : "in");
        setTextValue(textToDisplay);
    }, [textToDisplay]);

    useEffect(()=>{
        // console.log("Cursor position: " + cursorPositionRef.current);
        // console.log("Text area: " + textareaRef);
        textareaRef.current?.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);
    }, [textValue]);

    function handleLanguageDropdownChange(language : string, type : TranslateCardType) {
        if(handleLanguageChange) handleLanguageChange(language, type);
        setIsOpen(false);
    }

    function handleTextAreaChange(event : any) {
        cursorPositionRef.current = event.target.selectionStart;
        const msg = event.target.value ? event.target.value : "";
        if(handleTextChange) handleTextChange(msg);
    }

    function handleIconPress(icon : IconType){
        console.log(tag + "icon type : ", icon);
        if(handleIconClick) handleIconClick(icon, type);
    }

    function handleHeaderClick(){
        setIsOpen(lastOpen => !lastOpen);
    }

    return(
        <div className={`translator-card ${type === TranslateCardType.Output ? "output-card-container" : "input-card-container"}`}>
            <LanguageDropdownHeader type={type}
                                    optionToDisplay={language}
                                    handleHeaderClick={handleHeaderClick}
                                    isOpen={isOpen}
                                    />
            <LanguageDropdownBody type={type}
                                  optionToDisplay={language}
                                  optionToHide={otherLanguage}
                                  languages={languages}
                                  handleDropdownChange={handleLanguageDropdownChange}
                                  isOpen={isOpen}
            />
            <div className={`translator-card--loader-container ${(showLoader && type === TranslateCardType.Output) ? "" : "hide"}`}>
                <Spinner show={true}
                         borderColor={Color.DarkRed}
                         spinColor={Color.White}
                         className={"translator-card--spinner"}/>
            </div>
            <div className={`translator-card--textarea-container ${(isOpen || showLoader)? 'hide' : ''}`}>
                <textarea disabled={type === TranslateCardType.Output}
                          ref={textareaRef} // Attach the ref to the textarea element
                          maxLength={maxCharLimit}
                          autoComplete="off"
                          className={`translator-card--textarea disable-focus 
                            ${type === TranslateCardType.Output ? "translator-card--textarea--output red-scrollbar" : "blue-scrollbar"}`}
                          value={textValue}
                          onChange={handleTextAreaChange}
                          placeholder={type === TranslateCardType.Output ? "" : "What would you like to translate?"}
                />
                {type === TranslateCardType.Input &&
                    <div className={`translator-card--textarea-btns ${!textToDisplay ? 'hide' : ''}`}>
                        {mobile && <ClickableIcon icon={arrowIcon}
                                        handlePress={handleIconPress}
                                        disabled={currentStatus === LoadingStates.loading}
                                                  color={Color.White}
                                        iconRatio={45}
                                        className={"rotate-image-left"}
                                        backgroundColor={Color.Blue}
                                        iconType={IconType.Arrow}/>}
                        <ClickableIcon icon={deleteIcon}
                                       handlePress={handleIconPress}
                                       color={Color.Blue}
                                       iconRatio={35}
                                       iconType={IconType.Delete}/>
                    </div>
                }
            </div>
            <div className={`translator-card--icon-container ${isOpen? "hide" : ""}`}>
                <div className={`tc--icon-char-container ${type === TranslateCardType.Output ? 'hide' : ''} ${textValue.length === maxCharLimit ? 'tc--icon-char-container-max' : ''}`}><span>{textValue.length}</span>/<span>{maxCharLimit}</span></div>
                <ClickableIcon icon={copyIcon}
                               handlePress={handleIconPress}
                               color={type === TranslateCardType.Input? Color.Blue : Color.White}
                               iconType={IconType.Copy}/>
            </div>
        </div>
    )
}

export default TranslatorCard;
