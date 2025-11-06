import CustomerAdd from "./CustomerAdd.js";
import "./CustomerHome.scss";
import CustomerView from "./CustomerView.js";

function CustomerHome(){
    return(
        <div className="Home"> 
            <h2>Customer Page</h2>
            <CustomerAdd />
            <CustomerView />
        </div>
    );
};

export default CustomerHome;