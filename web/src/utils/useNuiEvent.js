import { useEffect, useRef } from 'react';

export const useNuiEvent = (action, handler) => {
    const savedHandler = useRef(() => { });

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const eventListener = (event) => {
            const { action: eventAction, data } = event.data;

            if (savedHandler.current) {
                if (eventAction === action) {
                    savedHandler.current(data);
                }
            }
        };

        window.addEventListener('message', eventListener);
        return () => window.removeEventListener('message', eventListener);
    }, [action]);
};
