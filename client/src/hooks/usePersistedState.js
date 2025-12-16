import { useState } from "react";

export default function usePersistedState(initialValue,key){
    const [state,setState] = useState(() =>{
        const storageData = localStorage.getItem(key);

        if(!storageData)
            return initialValue;

        const data = JSON.parse(storageData);

        return data;
    });

    const setPersistedState = (input) =>{
        let value = input;

        if(typeof input === 'function')
            value = input(state);

        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    }

    return[
        state,
        setPersistedState
    ]
}