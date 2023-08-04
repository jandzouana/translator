import React, { useState, useEffect } from 'react';
import {createTag} from "@/shared/utils/util";
import Translator from "../features/translator/Translator";
import ToneDropdown from "@/features/options/dropdown/ToneDropdown";
import {useDispatch, useSelector} from "react-redux";
import {selectTone, setTone} from "@/features/translator/slices/translationTextsSlice";
import {tones} from "@/shared/constants/constants";

interface Props {

}

const Main : React.FC<Props> = (props = {}) => {
    const tag = createTag("Main");
    // console.log(tag + "top");
    const currentTone = useSelector(selectTone);
    const dispatch = useDispatch();

    function handleToneClick(tone : string){
        console.log(tag + "Tone chosen: " + tone);
        dispatch(setTone(tone));
    }

    return(
        <div id={"main"}>
            <div id={"l1"} className={"level"}>
                <ToneDropdown optionToDisplay={currentTone} handleToneClick={handleToneClick} options={tones}/>
            </div>
            <div id={"l2"} className={"level"}>
                <Translator />
            </div>
        </div>
    );
}

export default Main;
