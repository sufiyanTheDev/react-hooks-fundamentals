import "./App.scss";
import Counter from "./components/Counter.js";
import GrocceryHome from "./components/grocerries/GrocceryHome.js";
import Search from "./components/Search.js";

function App() {
  return (
    <div>
      <Search />
      <Counter/>
      <GrocceryHome />
    </div>
  );
}

export default App;
