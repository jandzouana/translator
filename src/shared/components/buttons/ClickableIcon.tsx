import React, {CSSProperties, useState} from 'react';
import '../../styles/variables.css';
import '../../styles/clickable-icon.css';

import {Color, IconType} from "../../constants/enums";
import { varFormatWithColor } from "../../utils/util";

interface Props{
    size?: number,
    padding? : number,
    sizeType? : string,
    id? : string,
    className? : string,
    color? : Color,
    enablePress? : boolean
    icon : any,
    iconType : IconType,
    handlePress? : (icon : IconType) => void,
    iconRatio ? : number
}

const defaultSize = 30;
const defaultPadding = 10;

const ClickableIcon : React.FC<Props> = (props= {
    size: defaultSize,
    sizeType: "px",
    icon: null,
    iconType: IconType.Undefined
}) =>{
    const { id, size, padding, sizeType, className, color, enablePress, icon, handlePress, iconRatio, iconType } = props;
    const [isPressed, setIsPressed] = useState(false);

    function getSize(size : number, padding : number, sizeType : string) : string{
        return `calc(${size}${sizeType} - ${padding}${sizeType})`;
    }
    const buttonStyle : CSSProperties = {
        width: getSize(size ? size : defaultSize, padding ? padding : defaultPadding, sizeType ? sizeType : "px"),
        height: getSize(size ? size : defaultSize, padding ? padding : defaultPadding,sizeType ? sizeType : "px"),
        cursor: "pointer",
        padding: `${padding ? padding : defaultPadding}${sizeType ? sizeType : 'px'}`,
        borderRadius: "50%",
        // backgroundColor: "green",
        transition: "background-color 0.1s ease" /* Define the transition property */
    }

    const iconStyle : CSSProperties = {
        width: "100%",
        height: "100%",
        margin: "auto",
        fill: color ? varFormatWithColor(color) : varFormatWithColor(Color.White)
        // width: size ? size * (iconRatio ? iconRatio : .7) : "30px",
        // height: size ? size * (iconRatio ? iconRatio : .7) : "30px",
    }

    const handlePressInternal = () => {
        setIsPressed(true);
    };

    const handleRelease = () => {
        setIsPressed(false);
        if (handlePress) handlePress(iconType);
    };

    return(
        <div style={buttonStyle} className={"clickable-icon"}>
            {icon && <img src={icon}
                          id={id}
                          style={iconStyle}
                          className={`${className ? className : ""} clickable-icon-img`}
                          onMouseDown={handlePressInternal}
                          onMouseUp={handleRelease}
                          onTouchStart={handlePressInternal}
                          onTouchEnd={handleRelease}
                          alt={"icon"}
            />}
        </div>
    )
}

export default ClickableIcon;
