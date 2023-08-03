import "./spinner.css";

interface Props{
    show : boolean
    className ? : string
    size ? : number
}

const Spinner : React.FC<Props> = (props = {show : true}) => {
    // TODO: Implement size
    const { show, className, size } = props;
    return(
        <div className={`spin-loader ${show? "spin-show" : "spin-hide"} ${className ? className : ""}`}></div>
    )
}

export default Spinner;
