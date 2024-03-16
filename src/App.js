import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import ItemList from "./routes/ItemList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/item-list"} element={<ItemList />} />
      </Routes>
    </div>
  );
}

export default App;
