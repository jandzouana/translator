import React, { useState, useEffect } from 'react';
import { fetchTranslation } from "../features/api/chimeraGptApiSlice";
import { selectCurrentTranslation, selectStatus } from "../features/api/chimeraGptApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { createTag } from '../util';
import { RootState } from "../store";
import { LoadingStates } from "../constants/enums";

interface Props {

}
const Main : React.FC<Props> = (props = {}) => {
    console.log("top");
    const tag = createTag("Main");
    const dispatch = useDispatch();

    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchTranslation());
    }, [dispatch]);

    const currentTranslation = useSelector(selectCurrentTranslation);
    const currentStatus = useSelector(selectStatus);

    return(<div>
        <h1>Hello World</h1>
        <h2>{currentStatus === LoadingStates.succeeded && currentTranslation}</h2>
    </div>);
}

export default Main;
