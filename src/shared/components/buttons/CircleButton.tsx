import React, {useState} from 'react';
import '../../styles/variables.css';
import {Color, IconType} from "../../constants/enums";
import {getColorVarNameFromType, varFormatWithColor} from "../../utils/util";

interface Props{
    width?: number,
    height?: number,
    id? : string,
    className? : string,
    iconType? : IconType,
    color? : Color,
    enablePress? : boolean
    switchIcon? : any,
    handlePress? : any
}

const CircleButton : React.FC<Props> = (props) =>{
    const { id, width, height, className, color, enablePress, switchIcon, handlePress } = props;
    const [isPressed, setIsPressed] = useState(false);
    color && console.log("color: " + color);

    const buttonStyle = {
        width: width ? width : "50px",
        height: height ? height : "50px",
        borderRadius: "50%", /* Make the button circular */
        cursor: "pointer",
        // backgroundColor: color ? getColorVarNameFromType(color) : getColorVarNameFromType(Color.Blue),
        backgroundColor: isPressed && !color && enablePress ? varFormatWithColor(Color.DarkBlue): color ? varFormatWithColor(color) : varFormatWithColor(Color.Blue),
        // backgroundImage: `url(${baseIconUrl+"switch"+".svg"})`
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const iconStyle={
        width: width ? width * .7 : "30px",
        height: height ? height * .7 : "30px",
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
             className={`${className ? className : ""}`}
             onMouseDown={handlePressInternal}
             onMouseUp={handleRelease}
             onTouchStart={handlePressInternal}
             onTouchEnd={handleRelease}
        >
            {switchIcon && <img src={switchIcon} style={iconStyle} alt={"icon"}/>}
        </div>
    )
}

export default CircleButton;
