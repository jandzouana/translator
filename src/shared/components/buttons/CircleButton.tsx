import React, {CSSProperties, useState} from 'react';
import '../../styles/variables.css';
import { Color } from "../../constants/enums";
import { varFormatWithColor } from "../../utils/util";

interface Props{
    size?: number,
    sizeType? : string,
    id? : string,
    className? : string,
    color? : Color,
    enablePress? : boolean
    icon? : any,
    handlePress? : any,
    iconRatio? : number
}

const defaultSize = 50;

const CircleButton : React.FC<Props> = (props= {
    size: defaultSize,
    sizeType: "px"
}) =>{
    const { id, size, sizeType, className, color, enablePress, icon, handlePress, iconRatio } = props;
    const [isPressed, setIsPressed] = useState(false);

    const buttonStyle : CSSProperties = {
        width: size ?? defaultSize + (sizeType ?? "px"),
        height: size ?? defaultSize + (sizeType ?? "px"),
        borderRadius: "50%", /* Make the button circular */
        cursor: "pointer",
        // backgroundColor: color ? getColorVarNameFromType(color) : getColorVarNameFromType(Color.Blue),
        backgroundColor: isPressed && !color && enablePress ? varFormatWithColor(Color.DarkBlue): color ? varFormatWithColor(color) : varFormatWithColor(Color.Blue),
        // backgroundImage: `url(${baseIconUrl+"switch"+".svg"})`
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const iconStyle={
        width: size ? size * (iconRatio ? iconRatio : .7) : "30px",
        height: size ? size * (iconRatio ? iconRatio : .7) : "30px",
        // margin: "auto"
    }


    const handlePressInternal = () => {
        setIsPressed(true);
    };

    const handleRelease = () => {
        setIsPressed(false);
        handlePress();
    };

    return(
        <div id={id}
             style={buttonStyle}
             className={`drop-shadow ${className ? className : ""}`}
             onMouseDown={handlePressInternal}
             onMouseUp={handleRelease}
             onTouchStart={handlePressInternal}
             onTouchEnd={handleRelease}
        >
            {icon && <img src={icon} style={iconStyle} alt={"icon"}/>}
        </div>
    )
}

export default CircleButton;
