import React, { useState, useEffect } from 'react';
import { fetchTranslation } from "../features/api/chimeraGptApiSlice";
import { selectCurrentTranslation, selectStatus } from "../features/api/chimeraGptApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { createTag } from '../util';
import store, {AppDispatch, RootState, useAppDispatch} from "../store"; // useAppDispatch, apiDispatch

interface Props {

}
const Main : React.FC<Props> = (props = {}) => {
    console.log("top");
    const tag = createTag("Main");
    const dispatch =  useDispatch();

    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchTranslation());
    }, []); // dispatch

    const currentTranslation = useSelector(selectCurrentTranslation);
    const currentStatus = useSelector((state : RootState) => state.chimeraApi.status)//useSelector(selectStatus);

    return(<div>
        <h1>Hello World</h1>
        <h2>{currentStatus}</h2>
        <h2>{currentTranslation}</h2>
    </div>);
}

export default Main;
