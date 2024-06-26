import {useRef, useEffect, useState} from 'react';
import {
    clearCurrentTranslation,
    fetchTranslation,
    selectApiErrorMsg,
    selectCurrentTranslation,
    selectStatus,
} from "./slices/apiSlice";
import {
    selectInputLanguage,
    selectOutputLanguage,
    selectTextInput,
    selectTextOutput, selectTone,
    setInputLanguage,
    setOutputLanguage,
    setTextInput,
    setTextOutput
} from "./slices/translationTextsSlice";
import {useDispatch, useSelector} from "react-redux";
import {copyToClipboardUtil, createTag} from "@/shared/utils/util";
import {IconType, LoadingStates, TranslateCardType} from "@/shared/constants/enums";
import './styles/translator.css';
import TranslatorCard from "./components/TranslatorCard";
import CircleButton from "../../shared/components/buttons/CircleButton";
import switchIcon from '../../assets/sort2.svg';
import SquareButton from "../../shared/components/buttons/SquareButton";
import {defaultLanguages, mobileWidthBreakpoint} from "@/shared/constants/constants";
import useWindowSize from "@/shared/utils/useWindowSize";

interface Props {

}

const Translator : React.FC<Props> = (props = {}) => {
    const tag = createTag("Translator");
    // console.log(tag + "top");
    const enableTranslateLimit = true;
    const dispatch = useDispatch();

    const lastTranslationText = useRef("");
    const lastInputLanguage = useRef("");
    const lastOutputLanguage = useRef("");
    const lastTone = useRef("");

    // useEffect(()=>{
    //
    // }, [dispatch]);
    const textInput = useSelector(selectTextInput);
    const textOutput = useSelector(selectTextOutput);
    const inputLanguage = useSelector(selectInputLanguage);
    const outputLanguage = useSelector(selectOutputLanguage);

    const currentTranslation = useSelector(selectCurrentTranslation);
    const currentStatus = useSelector(selectStatus);
    const currentTone = useSelector(selectTone);
    const apiErrorMsg = useSelector(selectApiErrorMsg);
    const { width } = useWindowSize();
    const mobileCheckDidLoad = width !== -1;
    const isMobileSize = width < mobileWidthBreakpoint;

    useEffect(()=>{
        const inLanguage = localStorage.getItem("inputLanguage") || defaultLanguages.input;
        const outLanguage = localStorage.getItem("outputLanguage") || defaultLanguages.output;
        dispatch(setInputLanguage(inLanguage));
        dispatch(setOutputLanguage(outLanguage));
    }, [])

    useEffect(()=>{
        console.log(tag + "Setting current translation: " + currentTranslation);
        if(!currentTranslation) return;
        dispatch(setTextOutput(currentTranslation));
    }, [currentTranslation])

    function generateRequestMessage(input : string){
        const inputLanguageShort = inputLanguage.split(' ')[0];
        const outputLanguageShort = outputLanguage.split(' ')[0];

        const msg = `Translate the following from ${inputLanguageShort} to ${currentTone} ${outputLanguageShort}: ${input}`;
        console.log(tag + "Request message: " + msg);
        return msg;
    }

    function copyToClipboard(type : TranslateCardType){
        console.log("copy");
        const text = type === TranslateCardType.Output ? textOutput.slice() : textInput.slice();
        copyToClipboardUtil(text);
    }

    function clearLocalStorage(){
        localStorage.removeItem("inputLanguage");
        localStorage.removeItem("outputLanguage");
        localStorage.removeItem("translationUsageCount");
    }

    function handleIconClick(icon : IconType, type : TranslateCardType){
        switch(icon){
            case IconType.Copy: {
                copyToClipboard(type);
                break;
            }
            case IconType.Delete: {
                dispatch(setTextInput(""));
                break;
            }
            case IconType.Arrow:{
                //console.log("Arrow");
                handleTranslateBtnClick();
                const inputField = document.activeElement as HTMLElement;
                if (inputField) {
                    inputField.blur(); // Remove focus from the input field
                }
                break;
            }
            default:
                break;
        }
    }

    function handleTranslateBtnClick() {
        const storedUsageCount = localStorage.getItem('translationUsageCount');
        if(storedUsageCount && enableTranslateLimit) {
            const usageCount = parseInt(storedUsageCount, 10);
            if (usageCount >= 10) {
                alert('You have exceeded the limit of 10 free translations.');
                return;
            }
        }

        if(textInput.length !== 0 && (textInput !== lastTranslationText.current
            || inputLanguage !== lastInputLanguage.current
            || outputLanguage !== lastOutputLanguage.current
            || currentTone !== lastTone.current
            || currentStatus === LoadingStates.failed
        )){
            //@ts-ignore
            dispatch(fetchTranslation(generateRequestMessage(textInput)));
            //console.log(tag + "Current translation: " + textInput + " Last: " + lastTranslationText.current);
            lastTranslationText.current = textInput;
            lastInputLanguage.current = inputLanguage;
            lastOutputLanguage.current = outputLanguage;
            lastTone.current = currentTone;
            dispatch(clearCurrentTranslation());
        }
    }

    function handleTextInputChange(text : string){
        dispatch(setTextInput(text));
        // console.log(tag + text);
    }

    function handleLanguageChange(language : string, type : TranslateCardType){
        if(type === TranslateCardType.Input){
            dispatch(setInputLanguage(language));
            localStorage.setItem("inputLanguage", language);
        }
        else {
            dispatch(setOutputLanguage(language));
            localStorage.setItem("outputLanguage", language);
        }
    }

    function handleSwitchButtonPress(){
        // console.log(tag + "handleSwitchPress " + "in: " + textInput + " out: " + textOutput);
        const temp = textInput.trim();
        dispatch(setTextInput(textOutput)); // doesn't work when empty
        dispatch(setTextOutput(temp));
        const temp2 = inputLanguage;
        dispatch(setInputLanguage(outputLanguage));
        dispatch(setOutputLanguage(temp2));
    }

    return(
        <div id={"translator-container"}>
            <div id={"translator-container--main"}>
                <TranslatorCard type={TranslateCardType.Input}
                                handleTextChange={handleTextInputChange}
                                handleLanguageChange={handleLanguageChange}
                                handleIconClick={handleIconClick}
                                language={inputLanguage}
                                otherLanguage={outputLanguage}
                                mobile={mobileCheckDidLoad && isMobileSize}
                                currentStatus={currentStatus}
                                textToDisplay={textInput}/>
                {mobileCheckDidLoad && !isMobileSize &&
                    <CircleButton id={"switch-languages-button"}
                        icon={switchIcon}
                        disabled={currentStatus === LoadingStates.loading}
                        enablePressStyling={false}
                        handlePress={handleSwitchButtonPress}
                        className={"rotate-image-right drop-shadow"}
                        iconRatio={50}
                        size={50}
                />}
                <TranslatorCard
                    type={TranslateCardType.Output}
                    handleLanguageChange={handleLanguageChange}
                    handleIconClick={handleIconClick}
                    textToDisplay={textOutput}
                    language={outputLanguage}
                    otherLanguage={inputLanguage}
                    currentStatus={currentStatus}
                    showLoader={currentStatus === LoadingStates.loading}
                />
            </div>
            <div id={"translator-container--bottom"}>
                {mobileCheckDidLoad && !isMobileSize && <SquareButton disabled={currentStatus === LoadingStates.loading}
                                                        handlePress={handleTranslateBtnClick}
                                                        width={isMobileSize ? 100 : 120}
                                                        height={isMobileSize ? 70 : 50}
                                                        widthType={isMobileSize ? "%" : "px"}
                                                        heightType={"px"}
                                                        text={"Translate"}
                                                        fontSize={isMobileSize ? "var(--font-size-med)" : ""}
                />}
            </div>
        </div>

    );
}

export default Translator;
