import {TranslateCardType} from "@/shared/constants/enums";
import React, {useEffect, useState} from "react";
import "./tone-dropdown.css";

interface Props{
    optionToDisplay : string,
    options : Array<string>,
    handleToneClick : (tone : string) => void
}

const ToneDropdown : React.FC<Props> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [optionElements, setOptionElements] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const { optionToDisplay, handleToneClick, options } = props;

    useEffect(()=>{
        createOptionsFromArr(options);
    }, [selectedOption])

    useEffect(() => {
        setSelectedOption(optionToDisplay);
    }, [optionToDisplay])

    function createOptionsFromArr(ops : Array<string>){
        const selects : any = ops.map((option, idx) => {
            if(option !== selectedOption)
            {
                return <div key={idx}
                            className={`option tone-dropdown-option center`}
                            onClick={() => {
                                setIsOpen(false);
                                handleToneClick(option);
                            }}>
                    {option} </div>
            }
        });
        setOptionElements(selects);
    }
    const handleToggleDropdown = () => {
        setIsOpen(state => !state);
    };

    return(
      <div>
          <div className={`custom-dropdown tone-dropdown`}>
              <div className="dropdown-header tone-dropdown-header center" onClick={handleToggleDropdown}>
                  {optionToDisplay || 'Tone'}
                  <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
              </div>
              {isOpen && (
                  <div className={`dropdown-options-container tone-dropdown-options-container`}>
                      {optionElements}
                  </div>
              )}
          </div>
      </div>
    );
}

export default ToneDropdown;
