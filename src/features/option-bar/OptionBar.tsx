import ToneDropdown from "@/features/option-bar/option-dropdown/ToneDropdown";
import {mobileWidthBreakpoint, tones} from "@/shared/constants/constants";
import CircleButton from "@/shared/components/buttons/CircleButton";
import switchIcon from "@/assets/sort2.svg";
import React from "react";
import {createTag} from "@/shared/utils/util";
import {
    selectInputLanguage, selectOutputLanguage,
    selectTextInput, selectTextOutput,
    selectTone,
    setInputLanguage, setOutputLanguage,
    setTextInput,
    setTextOutput,
    setTone
} from "@/features/translator/slices/translationTextsSlice";
import { useSelector, useDispatch } from 'react-redux';
import "./option-bar.css";
import useWindowSize from "@/shared/utils/useWindowSize";

const OptionBar = () => {
    const tag = createTag("OptionBar");
    // console.log(tag + "top");
    const currentTone = useSelector(selectTone);
    const dispatch = useDispatch();

    const textInput = useSelector(selectTextInput);
    const textOutput = useSelector(selectTextOutput);
    const inputLanguage = useSelector(selectInputLanguage);
    const outputLanguage = useSelector(selectOutputLanguage);

    const { width } = useWindowSize();
    const mobileCheckDidLoad = width !== -1;
    const isMobileSize = width < mobileWidthBreakpoint;

    function handleToneClick(tone : string){
        console.log(tag + "Tone chosen: " + tone);
        dispatch(setTone(tone));
    }

    function handleSwitchButtonPress(){
        // console.log(tag + "handleSwitchPress " + "in: " + textInput + " out: " + textOutput);
        const temp = textInput.trim();
        dispatch(setTextInput(textOutput)); // doesn't work when empty
        dispatch(setTextOutput(temp));
        const temp2 = inputLanguage;
        dispatch(setInputLanguage(outputLanguage));
        dispatch(setOutputLanguage(temp2));
    }

    return(
        <div className={"option-bar"}>
            <ToneDropdown optionToDisplay={currentTone} handleToneClick={handleToneClick} options={tones}/>
            {mobileCheckDidLoad && isMobileSize && <CircleButton id={"option-bar-switch"}
                           icon={switchIcon}
                           enablePressStyling={false}
                           handlePress={handleSwitchButtonPress}
                           className={""}
                           iconRatio={50}
                           size={35}
            />}
        </div>
    )
}

export default OptionBar;
