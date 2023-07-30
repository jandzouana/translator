import React, {useState, CSSProperties, useEffect} from 'react';
import { varFormatWithColor, varFormatWithFont } from "../../../utils/util";
import {Color, Font} from "../../../constants/enums";
import "./language-dropdown.css";

interface Props{
    optionToDisplay: string,
    handleDropdownChange: any,
    color?: Color,
    languages: Array<string>
}

const LanguageDropdown : React.FC<Props> = (props=
                                                {optionToDisplay : "", handleDropdownChange: null, languages: []}) => {
    const {color, optionToDisplay, languages} = props;
    const [selectedOption, setSelectedOption] = useState('');
    const [languageList, setLanguageList] = useState([]);

    const dropDownStyle : CSSProperties  = {
        fontFamily: varFormatWithFont(Font.Primary),
        color: varFormatWithColor(color ? color : Color.White),
        border: "none",
        background: "none",
        padding: "4px",
        textAlign: "center",
        height: "40px",
        // maxHeight: '50px',
        borderRadius: '0px',
        cursor: "pointer"
    };

    const optionStyle = {
        backgroundColor: '#f0f0f0', // Customize the background color
        color: '#555', // Customize the text color
        padding: '20px',
        // height: '40px',
        minHeight: '50px',
        borderRadius: '0px'
    };

    const [isOpen, setIsOpen] = useState(false);

    const options : any = ['Option 1', 'Option 2', 'Option 3'];

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option : string) => {
        setSelectedOption(option);
        setIsOpen(false);
        props.handleDropdownChange(option);
    };

    useEffect(()=>{
        createSelectsFromLanguageArr(languages);
    }, [])

    useEffect(() => {
        setSelectedOption(optionToDisplay);
    }, [optionToDisplay])

    // function handleDropdownChange(event : any) {
    //     setSelectedOption(event.target.value);
    //     props.handleDropdownChange(event.target.value);
    // }

    function createSelectsFromLanguageArr(langs : Array<string>){
        const selects : any = langs.map((language, idx) => {
            return <option key={idx} style={optionStyle} value={language}>{language}</option>
        });
        setLanguageList(selects);
    }

    return(
        // <select className="disable-focus" style={dropDownStyle} value={selectedOption} onChange={handleDropdownChange}>
        //     {/*<option value="option1">Option 1</option>*/}
        //     {/*<option value="option2">Option 2</option>*/}
        //     {/*<option value="option3">Option 3</option>*/}
        //     {languageList}
        // </select>
        <div className="custom-dropdown">
            <div className="dropdown-header" onClick={handleToggleDropdown}>
                {selectedOption || 'Select an option'}
                <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
            </div>
            {isOpen && (
                <div className="dropdown-options">
                    {options.map((option : string) => (
                        <div key={option} className="option" onClick={() => handleOptionClick(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageDropdown;
