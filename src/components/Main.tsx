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
            <div id={"l1"} className={"level"}>
                Dropdown goes here
            </div>
            <div id={"l2"} className={"level"}>
                <Translator />
            </div>
            <div id={"l3"} className={"level"}>
                Translate button goes here
            </div>
        </div>
    );
}

export default Main;
