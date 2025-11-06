import { Provider } from "react-redux";
import "./App.scss";
import Counter from "./components/Counter.js";
import CustomerHome from "./components/customer/CustomerHome.js";
import GrocceryHome from "./components/grocerries/GrocceryHome.js";
import Search from "./components/Search.js";
import { store } from "./Store/Store.js";

function App() {
  return (
    <div>
      <Search />
      <Counter/>
      <GrocceryHome />
      <Provider store={store}>
        <CustomerHome />
      </Provider>
      
    </div>
  );
}

export default App;
