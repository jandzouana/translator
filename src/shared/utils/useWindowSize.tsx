import { useState, useEffect, useRef} from 'react';
import {mobileWidthBreakpoint} from "@/shared/constants/constants";
import {createTag} from "@/shared/utils/util";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: -1,
        height: -1
    });
    const lastWindowHeight = useRef("");

    const tag = createTag("useWindowSize");

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
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
        if(lastWindowHeight.current === divElement.style.height) {
            console.log(tag + "same height");
            return;
        }
        if (divElement) {
            if(width > mobileWidthBreakpoint) { // Desktop
                divElement.style.height = `100vh`;
                lastWindowHeight.current = "100vh";
            }
            else { // Mobile
                divElement.style.height = `${windowHeight}px`;
                lastWindowHeight.current = `${windowHeight}px`;
            }
        }
        console.log(tag + "Adjusting height to: " + divElement.style.height);
    };

    return windowSize;
};

export default useWindowSize;
