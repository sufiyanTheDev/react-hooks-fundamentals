import { useDispatch, useSelector } from "react-redux";
import { removeCustomer } from "../../Store/customerSlice.js";

function CustomerView(){
    const customer = useSelector((state) => state.customer);
    const dispatch = useDispatch();

    const onRemoveHandler = (e) => {
        const id = e.currentTarget.dataset.id;
        dispatch(removeCustomer(id));
    };
    
    return(
        <>
            <h2>Customer List</h2>
            <ul>
                {customer.map((item) => <><li>{item}</li><button data-id={item} onClick={onRemoveHandler}>Remove me</button></>)}
            </ul>
        </>
    );
}

export default CustomerView;