import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../Store/customerSlice.js";

function CustomerAdd(){
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const onFieldChange = (e) => {
        setInput(e.target.value);
    };

    const onSaveClick = () => {
        // console.log(input);
        dispatch(addCustomer(input));
        setInput("");
    };

    return (
        <div>
            <input value={input} onChange={onFieldChange}/>
            <button onClick={onSaveClick}>Add</button>
        </div>
    );
}

export default CustomerAdd;