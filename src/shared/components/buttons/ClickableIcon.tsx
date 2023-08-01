import React, {CSSProperties, useState} from 'react';
import '../../styles/variables.css';
import {Color, IconType} from "../../constants/enums";
import { varFormatWithColor } from "../../utils/util";

interface Props{
    size?: number,
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

const defaultSize = 25;

const ClickableIcon : React.FC<Props> = (props= {
    size: defaultSize,
    sizeType: "px",
    icon: null,
    iconType: IconType.Undefined
}) =>{
    const { id, size, sizeType, className, color, enablePress, icon, handlePress, iconRatio, iconType } = props;
    const [isPressed, setIsPressed] = useState(false);

    const buttonStyle : CSSProperties = {
        width: size ?? defaultSize + (sizeType ?? "px"),
        height: size ?? defaultSize + (sizeType ?? "px"),
        cursor: "pointer",
    }

    const iconStyle : CSSProperties = {
        width: "100%",
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
        <div style={buttonStyle}>
            {icon && <img src={icon}
                          id={id}
                          style={iconStyle}
                          className={`${className ? className : ""}`}
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
