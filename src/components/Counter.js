import { useState } from "react";

export default function Counter(){
    const [count, setCount] = useState(0);
    const onIncrementHandler = () => {
        setCount(prev => prev+1);
        setCount(prev => prev+1);
        // setCount(count+1);
    }
    return (
        <>
            <h1>Counter</h1>
            <p>{count}</p>
            <button onClick={onIncrementHandler}>Add Me</button>
        </>
    )
}