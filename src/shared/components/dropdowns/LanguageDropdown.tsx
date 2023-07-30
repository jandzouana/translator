import React, {useState, CSSProperties, useEffect} from 'react';
import { varFormatWithColor, varFormatWithFont } from "../../utils/util";
import {Color, Font} from "../../constants/enums";

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

    useEffect(()=>{
        createSelectsFromLanguageArr(languages);
    }, [])

    useEffect(() => {
        setSelectedOption(optionToDisplay);
    }, [optionToDisplay])

    function handleDropdownChange(event : any) {
        setSelectedOption(event.target.value);
        props.handleDropdownChange(event.target.value);
    }

    function createSelectsFromLanguageArr(langs : Array<string>){
        const selects : any = langs.map((language, idx) => {
            return <option key={idx} style={optionStyle} value={language}>{language}</option>
        });
        setLanguageList(selects);
    }

    return(
        <select className="disable-focus" style={dropDownStyle} value={selectedOption} onChange={handleDropdownChange}>
            {/*<option value="option1">Option 1</option>*/}
            {/*<option value="option2">Option 2</option>*/}
            {/*<option value="option3">Option 3</option>*/}
            {languageList}
        </select>
    )
}

export default LanguageDropdown;
