import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

const useWindowSize = (): WindowSize => {
    const isClient = typeof window === 'object';

    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: isClient ? window.innerWidth : 0,
        height: isClient ? window.innerHeight : 0,
    });

    useEffect(() => {
        if (!isClient) {
            return;
        }

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isClient]);

    return windowSize;
};

export default useWindowSize;
