import "./spinner.css";
import {CSSProperties} from "react";
import {Color} from "@/shared/constants/enums";
import {varFormatWithColor} from "@/shared/utils/util";

interface Props{
    show : boolean
    className ? : string
    size ? : number,
    spinColor ? : Color,
    borderColor ? : Color
}

const defaultSize : string = "14px";

const Spinner : React.FC<Props> = (props = {show : true}) => {
    const { show, className, size, spinColor, borderColor } = props;

    const style : CSSProperties = {
        width: size ? size : defaultSize,
        height: size? size : defaultSize,
        borderRadius: "50%",
        animation: "spin 1s infinite linear",
        border: `4px solid ${borderColor ? varFormatWithColor(borderColor) : varFormatWithColor(Color.White)}`,
        borderTop: `4px solid ${spinColor ? varFormatWithColor(spinColor) : varFormatWithColor(Color.Blue)}`
    }

    return(
        <div style={style} className={`spin-loader ${show? "spin-show" : "spin-hide"} ${className ? className : ""}`}></div>
    )
}

export default Spinner;
