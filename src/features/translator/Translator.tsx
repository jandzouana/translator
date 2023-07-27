import React, { useState, useEffect } from 'react';
import { fetchTranslation } from "./slices/chimeraGptApiSlice";
import { selectCurrentTranslation, selectStatus, selectApiError } from "./slices/chimeraGptApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { createTag} from "../../shared/utils/util";
import {LoadingStates, TranslateCardType} from "../../shared/constants/enums";
import './styles/translator.css';
import TranslatorCard from "./components/TranslatorCard";
import CircleButton from "../../shared/components/buttons/CircleButton";
import switchIcon from '../../assets/switch.svg';

interface Props {

}
const Translator : React.FC<Props> = (props = {}) => {
    console.log("top");
    const tag = createTag("Main");
    const dispatch = useDispatch();

    useEffect(()=>{
        // @ts-ignore
        //dispatch(fetchTranslation());
    }, [dispatch]);

    const currentTranslation = useSelector(selectCurrentTranslation);
    const currentStatus = useSelector(selectStatus);
    const apiError = useSelector(selectApiError);

    return(
        <div id={"translator-container"}>
            <TranslatorCard type={TranslateCardType.Input} />
            <CircleButton id={"switch-languages-button"} switchIcon={switchIcon} enablePress={false}/>
            <TranslatorCard type={TranslateCardType.Output} />
        </div>
    );
}

// <h1>Hello World</h1>
// <h2>{currentStatus === LoadingStates.succeeded && currentTranslation}</h2>
// <h2>Current Status: {currentStatus}</h2>
// <h2>{currentStatus === LoadingStates.failed && apiError}</h2>
export default Translator;
