import { useState, useEffect, useRef} from 'react';
import {mobileWidthBreakpoint} from "@/shared/constants/constants";
import {createTag} from "@/shared/utils/util";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: -1,
        height: -1
    });
    const lastWindowHeight = useRef("");
    const lastWindowTypeMobile = useRef(false);

    const tag = createTag("useWindowSize");

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        lastWindowTypeMobile.current = window.innerWidth < mobileWidthBreakpoint;
        adjustDivHeight(window.innerWidth);
        const handleResize = () => {
            adjustDivHeight(window.innerWidth);
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const adjustDivHeight = (width : number) => {
        const windowHeight = window.innerHeight;
        const divElement = document.querySelector('.full-height') as HTMLElement;

        if (divElement) {
            let newHeight = "";
            let minHeight = "";
            if(width > mobileWidthBreakpoint) { // Desktop
                newHeight = "100vh";
                minHeight = "var(--min-app-height)";
            }
            else { // Mobile
                newHeight = `${windowHeight}px`;
                minHeight = "var(--min-app-height-mobile)";
            }
            if(lastWindowHeight.current.length !== 0 && lastWindowHeight.current === newHeight) {
                console.log(tag + "same height : " + divElement.style.height);
                return;
            }
            divElement.style.height = newHeight;
            divElement.style.minHeight = minHeight;
            lastWindowHeight.current = newHeight;
        }
        else{
            console.log("No div");
        }
        console.log(tag + "Adjusting height to: " + divElement.style.height);
    };

    return windowSize;
};

export default useWindowSize;
