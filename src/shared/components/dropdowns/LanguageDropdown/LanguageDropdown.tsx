import React, {useEffect, useState} from 'react';
import {TranslateCardType} from "../../../constants/enums";
import "./language-dropdown.css";
import "../custom-dropdown.css";

interface Props{
    optionToDisplay: string,
    handleDropdownChange: any,
    languages: Array<string>,
    type: TranslateCardType
}

const LanguageDropdown : React.FC<Props> = (props=
                                                {optionToDisplay : "", handleDropdownChange: null, languages: [], type: TranslateCardType.Input}) => {
    const {optionToDisplay, languages, type} = props;
    const [selectedOption, setSelectedLanguage] = useState('');
    const [languageList, setLanguageList] = useState([]);

    const [isOpen, setIsOpen] = useState(false);


    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageClick = (language : string) => {
        setSelectedLanguage(language);
        setIsOpen(false);
        props.handleDropdownChange(language);
    };

    useEffect(()=>{
        createSelectsFromLanguageArr(languages);
    }, [])

    useEffect(() => {
        setSelectedLanguage(optionToDisplay);
    }, [optionToDisplay])

    // TODO: Check if current option is in langauges arr
    function createSelectsFromLanguageArr(langs : Array<string>){
        const selects : any = langs.map((language, idx) => {
            return <div key={idx}
                        className={"option language-dropdown-option"}
                        onClick={() => handleLanguageClick(language)}>
                        {language} </div>
        });
        setLanguageList(selects);
    }

    return(
        <div className="custom-dropdown language-dropdown">
            <div className="dropdown-header language-dropdown-header" onClick={handleToggleDropdown}>
                {selectedOption || 'Select an option'}
                <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
            </div>
            {isOpen && (
                <div className={`dropdown-options-container ld-options-container ${type === TranslateCardType.Input ? "ld-options-container--input" : "ld-options-container--output"}`}>
                    {languageList}
                </div>
            )}
        </div>
    )
}

export default LanguageDropdown;
