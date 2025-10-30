import { useCallback, useEffect, useRef } from "react";

export function useDebounce(callback, delay){
    // variable is used to store the timerid across renders untill unless the component is unmounted
    const timeoutRef = useRef(null);

    // clear the Timeout immediately it is called
    const cancel = useCallback(() => {
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    },[]);
    
    // cleanup on unmount
    useEffect(() => {
        return cancel;
    }, [cancel]);

    // remove the older time out and sets the new timeout
    const debouncedFn = useCallback((...args) => {
        
        // clear an active timer
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }

        // start a new callback
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);

    }, [callback, delay]);

    return {debouncedFn, cancel};
}