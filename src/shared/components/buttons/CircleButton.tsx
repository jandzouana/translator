import React, {CSSProperties, useState} from 'react';
import '../../styles/variables.css';
import { Color } from "../../constants/enums";
import { varFormatWithColor } from "../../utils/util";
import Image from "next/image";
import {TouchOrMouseEvent} from "@/shared/constants/types";

interface Props{
    size?: number,
    sizeType? : string,
    id? : string,
    className? : string,
    color? : Color,
    enablePressStyling? : boolean,
    disabled? : boolean,
    icon? : any,
    handlePress? : any,
    iconRatio? : number,
}

const defaultSize = 50;
const defaultRatio = 70;

const CircleButton : React.FC<Props> = (props= {
    size: defaultSize,
    sizeType: "px"
}) =>{
    const { id, size, sizeType, className, color, disabled, enablePressStyling, icon, handlePress, iconRatio } = props;
    const [isPressed, setIsPressed] = useState(false);

    const buttonStyle : CSSProperties = {
        width: size ?? defaultSize + (sizeType ?? "px"),
        height: size ?? defaultSize + (sizeType ?? "px"),
        borderRadius: "50%", /* Make the button circular */
        cursor: "pointer",
        // backgroundColor: color ? getColorVarNameFromType(color) : getColorVarNameFromType(Color.Blue),
        backgroundColor: isPressed && !color && enablePressStyling ? varFormatWithColor(Color.DarkBlue): color ? varFormatWithColor(color) : varFormatWithColor(Color.Blue),
        // backgroundImage: `url(${baseIconUrl+"switch"+".svg"})`
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const iconStyle={
        width: `${iconRatio ? iconRatio : defaultRatio}%`,
        height: `${iconRatio ? iconRatio : defaultRatio}%`
    }


    const handlePressInternal = (event : TouchOrMouseEvent) => {
        // event.preventDefault();
        // console.log("handlePressInternal");
        setIsPressed(true);
    };

    const handleRelease = (event : TouchOrMouseEvent) => {
        event.preventDefault();
        // console.log("handleRelease");
        setIsPressed(false);
        if(handlePress && !disabled) handlePress();
    };

    return(
        <div id={id}
             style={buttonStyle}
             className={`${className ? className : ""}`}
             onMouseDown={handlePressInternal}
             onMouseUp={handleRelease}
             onTouchStart={handlePressInternal}
             onTouchEnd={handleRelease}
        >
            {icon && <Image src={icon} style={iconStyle} alt={"icon"}/>}
        </div>
    )
}

export default CircleButton;
