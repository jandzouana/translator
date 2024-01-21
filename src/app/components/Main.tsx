import React, { useState, useEffect } from 'react';
import {createTag} from "@/shared/utils/util";
import Translator from "../../features/translator/Translator";
import OptionBar from "@/features/option-bar/OptionBar";

interface Props {

}

const Main : React.FC<Props> = (props = {}) => {
    const tag = createTag("Main");

    return(
        <div id={"main"}>
            <div id={"l1"} className={"level"}>
                <OptionBar/>
            </div>
            <div id={"l2"} className={"level"}>
                <Translator />
            </div>
        </div>
    );
}

export default Main;
