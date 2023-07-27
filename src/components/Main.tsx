import React, { useState, useEffect } from 'react';
import {createTag} from "../shared/utils/util";
import Translator from "../features/translator/Translator";

interface Props {

}
const Main : React.FC<Props> = (props = {}) => {
    console.log("top");
    const tag = createTag("Main");

    useEffect(()=>{

    }, []);


    return(
        <div id={"main"}>
            <div id={"l1"} className={"level"}></div>
            <div id={"l2"} className={"level"}>
                <Translator />
            </div>
            <div id={"l3"} className={"level"}></div>
        </div>
    );
}

export default Main;
