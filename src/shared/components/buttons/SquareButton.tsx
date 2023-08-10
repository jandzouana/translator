import React, {CSSProperties, useState} from 'react';
import '../../styles/variables.css';
import { Color, Font } from "../../constants/enums";
import { varFormatWithColor, varFormatWithFont } from "../../utils/util";
import {TouchOrMouseEvent} from "@/shared/constants/types";

interface Props{
    width?: number,
    height?: number,
    heightType?: string,
    widthType? : string,
    id? : string,
    className? : string,
    color? : Color,
    enablePress? : boolean
    handlePress? : any,
    disabled? : boolean,
    text? : string,
    textColor? : Color
}

const defaultWidth = 100;
const defaultHeight = 50;

const SquareButton : React.FC<Props> = (props= {
    width: defaultWidth,
    height: defaultHeight,
    heightType: "px",
    widthType: "px",
    text: "Button"
}) =>{
    const { id, width, height, heightType, widthType, className, color, enablePress, handlePress, disabled, text, textColor } = props;
    const [isPressed, setIsPressed] = useState(false);

    const buttonStyle : CSSProperties = {
        width: (width ? width : defaultWidth) + (widthType ? widthType : "px"),
        height: (height ? height : defaultHeight) + (heightType ? heightType : "px"),
        borderRadius: "10px", /* Make the button circular */
        cursor: "pointer",
        backgroundColor: isPressed && !color && enablePress ? varFormatWithColor(Color.DarkBlue): color ? varFormatWithColor(color) : varFormatWithColor(Color.Blue),
        fontFamily: varFormatWithFont(Font.Primary),
        fontWeight: "var(--font-weight-semi-bold)",
        border: "none",
        color: textColor? varFormatWithColor(textColor) : varFormatWithColor(Color.White)
    }

    const handlePressInternal = (event : any) => {
        // event.preventDefault();
        setIsPressed(true);
    };

    const handleRelease = (event : any) => {
        event.preventDefault();
        setIsPressed(false);
        handlePress();
    };

    return(
        <button
            id={id}
            disabled={disabled}
            style={buttonStyle}
            className={`${className ? className : ""}`}
            onMouseDown={handlePressInternal}
            onMouseUp={handleRelease}
            onTouchStart={handlePressInternal}
            onTouchEnd={handleRelease}
        >
            {text}
        </button>
    )
}

export default SquareButton;
