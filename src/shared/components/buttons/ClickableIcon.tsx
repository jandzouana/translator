import { CSSProperties, useState } from 'react';
import '../../styles/variables.css';
import '../../styles/clickable-icon.css';

import {Color, IconType} from "../../constants/enums";
import { varFormatWithColor } from "../../utils/util";
import Image from "next/image";
import {TouchOrMouseEvent} from "@/shared/constants/types";

interface Props{
    size?: number,
    sizeType? : string,
    id? : string,
    className? : string,
    color? : Color,
    disable? : boolean
    icon : any,
    iconType : IconType,
    handlePress? : (icon : IconType) => void,
    iconRatio ? : number
}

const defaultSize : number = 40;
const defaultIconRatio : number = 50;

const ClickableIcon : React.FC<Props> = (props= {
    size: defaultSize,
    iconRatio: defaultIconRatio,
    sizeType: "px",
    icon: null,
    iconType: IconType.Undefined
}) =>{
    const { id, size, sizeType, className, color, disable, icon, handlePress, iconRatio, iconType } = props;
    const [isPressed, setIsPressed] = useState(false);

    function getSize(size : number, sizeType : string) : string{
        // return `calc(${size}${sizeType} - ${padding}${sizeType})`;
        return `${size}${sizeType}`;
    }
    const buttonStyle : CSSProperties = {
        width: getSize(size ? size : defaultSize, sizeType ? sizeType : "px"),
        height: getSize(size ? size : defaultSize, sizeType ? sizeType : "px"),
        cursor: "pointer",
        // padding: `${padding ? padding : defaultPadding}${sizeType ? sizeType : 'px'}`,
        borderRadius: "50%",
        // backgroundColor: "green",
        transition: "background-color 0.1s ease", /* Define the transition property */
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const iconStyle : CSSProperties = {
        width: `${iconRatio ? iconRatio : defaultIconRatio}%`,
        height: `${iconRatio ? iconRatio : defaultIconRatio}%`,
        margin: "auto",
    }

    const handlePressInternal = (event : TouchOrMouseEvent) => {
        // event.preventDefault();
        setIsPressed(true);
    };

    const handleRelease = (event : TouchOrMouseEvent) => {
        event.preventDefault();
        setIsPressed(false);
        if (handlePress && !disable) handlePress(iconType);
    };

    return(
        <div style={buttonStyle}
             onMouseDown={handlePressInternal}
             onMouseUp={handleRelease}
             onTouchStart={handlePressInternal}
             onTouchEnd={handleRelease}
             className={"clickable-icon"}>
            {icon && <Image src={icon}
                          id={id}
                          style={iconStyle}
                          className={`${className ? className : ""} clickable-icon-img ${color === Color.Blue ? 'clickable-icon-blue' : ''}`}
                          alt={"icon"}
            />}
        </div>
    )
}

export default ClickableIcon;
