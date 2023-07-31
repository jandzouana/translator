import React, {useEffect, useState} from 'react';
import {TranslateCardType} from "../../../../shared/constants/enums";
import "./language-dropdown.css";
import "../../../../shared/styles/custom-dropdown.css";

interface Props{
    optionToDisplay: string,
    handleDropdownChange: any,
    languages: Array<string>,
    type: TranslateCardType
}

const LanguageDropdown : React.FC<Props> = (props=
                                                {optionToDisplay : "", handleDropdownChange: null, languages: [], type: TranslateCardType.Input}) => {
    const {optionToDisplay, languages, type} = props;
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [languageList, setLanguageList] = useState([]);

    const [isOpen, setIsOpen] = useState(false);


    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageClick = (language : string, type : TranslateCardType) => {
        setSelectedLanguage(language);
        setIsOpen(false);
        props.handleDropdownChange(language, type);
    };

    useEffect(()=>{
        createSelectsFromLanguageArr(languages);
    }, [selectedLanguage])

    useEffect(() => {
        setSelectedLanguage(optionToDisplay);
        // createSelectsFromLanguageArr(languages);
    }, [optionToDisplay])

    // TODO: Check if current option is in languages arr
    function createSelectsFromLanguageArr(langs : Array<string>){
        const selects : any = langs.map((language, idx) => {
            if(language !== selectedLanguage)
            {
                return <div key={idx}
                            className={`option language-dropdown-option center ${type === TranslateCardType.Output? "language-dropdown-option-red" : ""}`}
                            onClick={() => handleLanguageClick(language, type)}>
                    {language} </div>
            }
        });
        setLanguageList(selects);
    }

    return(
        <div className={`custom-dropdown language-dropdown ${type === TranslateCardType.Input ? "language-dropdown-input" : "language-dropdown-output"}`}>
            <div className="dropdown-header language-dropdown-header center" onClick={handleToggleDropdown}>
                {selectedLanguage || 'Language'}
                <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
            </div>
            {isOpen && (
                <div className={`dropdown-options-container ld-options-container ${type === TranslateCardType.Input ? "ld-options-container--input blue-scrollbar" : "ld-options-container--output red-scrollbar"}`}>
                    {languageList}
                </div>
            )}
        </div>
    )
}

export default LanguageDropdown;
