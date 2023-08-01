import React, {useEffect, useState} from 'react';
import {TranslateCardType} from "../../../../shared/constants/enums";
import "./language-dropdown.css";
import "../../../../shared/styles/custom-dropdown.css";

interface PropsHeader{
    optionToDisplay: string,
    type: TranslateCardType,
    handleHeaderClick : any
}

interface PropsBody{
    optionToDisplay: string,
    type: TranslateCardType,
    handleDropdownChange: any,
    languages: Array<string>,
    isOpen : boolean
}

export const LanguageDropdownHeader : React.FC<PropsHeader> = (props=
                                                {optionToDisplay : "", handleHeaderClick: null, type: TranslateCardType.Input}) => {
    const {optionToDisplay, type, handleHeaderClick} = props;

    const [isOpen, setIsOpen] = useState(false);


    const handleToggleDropdown = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        handleHeaderClick(newState);
    };

    return(
        <div className={`custom-dropdown language-dropdown ${type === TranslateCardType.Input ? "language-dropdown-input" : "language-dropdown-output"}`}>
            <div className="dropdown-header language-dropdown-header center" onClick={handleToggleDropdown}>
                {optionToDisplay || 'Language'}
                <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
            </div>

        </div>
    )
}

export const LanguageDropdownBody: React.FC<PropsBody> = (props) => {
    const { isOpen, type, languages, optionToDisplay } = props;
    const [languageList, setLanguageList] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    // console.log("isOpen: " + isOpen);

    useEffect(()=>{
        createSelectsFromLanguageArr(languages);
    }, [selectedLanguage])

    useEffect(() => {
        setSelectedLanguage(optionToDisplay);
        // createSelectsFromLanguageArr(languages);
    }, [optionToDisplay])

    function createSelectsFromLanguageArr(langs : Array<string>){
        const selects : any = langs.map((language, idx) => {
            if(language !== selectedLanguage)
            {
                return <div key={idx}
                            className={`option language-dropdown-option center ${type === TranslateCardType.Output? "language-dropdown-option-red" : "language-dropdown-option-blue"}`}
                            onClick={() => handleLanguageClick(language, type)}>
                    {language} </div>
            }
        });
        setLanguageList(selects);
    }

    const handleLanguageClick = (language : string, type : TranslateCardType) => {
        setSelectedLanguage(language);
        // setIsOpen(false);
        props.handleDropdownChange(language, type);
    };

    return(
        <>
            {isOpen && (
                <div className={`ld-options-container ${type === TranslateCardType.Input ? "ld-options-container--input blue-scrollbar" : "ld-options-container--output red-scrollbar"}`}>
                    {languageList}
                </div>
            )}
        </>
    )
}
