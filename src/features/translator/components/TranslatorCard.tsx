import React from 'react';
import {TranslateCardType} from "../../../shared/constants/enums";

// TODO: Move later
interface Props {
    type: TranslateCardType
}

const TranslatorCard : React.FC<Props> = (props = {type:TranslateCardType.Input}) => {
    const { type } = props;

    return(
        <div className={`translator-card ${type === TranslateCardType.Output ? "output-card-container" : "input-card-container"}`}>

        </div>
    )
}

export default TranslatorCard;
