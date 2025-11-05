import { useState } from "react";
import GrocceryList from "./GrocceryList.js";
import './GrocceryHome.scss';
const initList = [
    {
        id: 1,
        name: "tomato",
        calories: 40,
        editable: false
    },
    {
        id: 2,
        name: "cucumber",
        calories: 20,
        editable: false
    },
];
function GrocceryHome() {
    const [list, setList] = useState(initList);

    const removeMeHandler = (e) => {
        setList((prev) => prev.filter((item) => item.id != e.target.id));
    };

    const nameChangeHandler = (e) => {
        const id = e.currentTarget.dataset.id;
        setList((prev) => prev.map((item) => {
            if(item.id == id){
                item.editable = !prev.editable;
            }
            else{
                item.editable = false;
            }
            return item;
        }));
    };

    const enterPressHandler = (e) => {
        if (e.key === "Enter") {
            const id = e.currentTarget.dataset.id;
            const value = e.target.value;
            if(value.trim() === "") return;
            setList((prev) => prev.map(item => {
                if(id == item.id){
                    item.name = value;
                    item.editable = false;
                }
                return item;
            }));
        }
    };
    return(
        <>
            <h1>Groccery</h1>
            <div className="container">
            {
                list.map((item,index) => <GrocceryList key={`${item.name} : ${index} : ${item.id}`} id={item.id} name={item.name} calories={item.calories} removeMeHandler={removeMeHandler} nameChangeHandler={nameChangeHandler} editable={item.editable} inputChangeHandler={() => {}}  enterPressHandler={enterPressHandler}/>)
            }
            </div>
        </>
    );
}

export default GrocceryHome;