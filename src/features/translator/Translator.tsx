import React, { useState, useEffect } from 'react';
import { fetchTranslation } from "./slices/chimeraGptApiSlice";
import { selectCurrentTranslation, selectStatus, selectApiError } from "./slices/chimeraGptApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { createTag} from "../../shared/utils/util";
import { LoadingStates} from "../../shared/constants/enums";

interface Props {

}
const Translator : React.FC<Props> = (props = {}) => {
    console.log("top");
    const tag = createTag("Main");
    const dispatch = useDispatch();

    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchTranslation());
    }, [dispatch]);

    const currentTranslation = useSelector(selectCurrentTranslation);
    const currentStatus = useSelector(selectStatus);
    const apiError = useSelector(selectApiError);

    return(<div id={"translatorContainer"}>
        <h1>Hello World</h1>
        <h2>{currentStatus === LoadingStates.succeeded && currentTranslation}</h2>
        <h2>Current Status: {currentStatus}</h2>
        <h2>{currentStatus === LoadingStates.failed && apiError}</h2>
    </div>);
}

export default Translator;
