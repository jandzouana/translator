import React, {useState} from 'react';
import '../../styles/variables.css';
import {Color, IconType} from "../../constants/enums";
import {getColorVarNameFromType, varFormatWithColor} from "../../utils/util";
//@ts-ignore
import switchIcon from '../../../assets/switch.svg';

interface Props{
    width?: number,
    height?: number,
    id? : string,
    className? : string,
    iconType? : IconType,
    color? : Color,
    enablePress? : boolean
}

const CircleButton : React.FC<Props> = (props) =>{
    const { id, width, height, className, color, enablePress } = props;
    const [isPressed, setIsPressed] = useState(false);
    color && console.log("color: " + color);

    const buttonStyle = {
        width: width ? width : "50px",
        height: height ? height : "50px",
        borderRadius: "50%", /* Make the button circular */
        cursor: "pointer",
        // backgroundColor: color ? getColorVarNameFromType(color) : getColorVarNameFromType(Color.Blue),
        backgroundColor: isPressed && !color && enablePress ? varFormatWithColor(Color.DarkBlue): color ? varFormatWithColor(color) : varFormatWithColor(Color.Blue),
    }


    const handlePress = () => {
        setIsPressed(true);
    };

    const handleRelease = () => {
        setIsPressed(false);
    };

    return(
        <div id={id}
             style={buttonStyle}
             className={`${className ? className : ""}`}
             onMouseDown={handlePress}
             onMouseUp={handleRelease}
             onTouchStart={handlePress}
             onTouchEnd={handleRelease}
        >
            <img src={switchIcon} alt={"icon"}/>
        </div>
    )
}

export default CircleButton;
