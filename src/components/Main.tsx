import React, { useState, useEffect } from 'react';
import { fetchTranslation } from "../features/api/chimeraGptApiSlice";
import { selectCurrentTranslation } from "../features/api/chimeraGptApiSlice";
import { useSelector, useDispatch } from "react-redux";
import store from '../store';

interface Props {

}
const Main : React.FC<Props> = (props = {}) => {
    useEffect(()=>{
        store.dispatch(fetchTranslation());
    }, [])
    const currentTranslation = useSelector(selectCurrentTranslation);
    return(<div>
        <h1>Hello World</h1>
        <h2>{currentTranslation}</h2>
    </div>);
}

export default Main;
