import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import ItemList from "./routes/ItemList";
import AdminItemManaging from "./routes/AdminItemManaging";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/items"} element={<ItemList />} />
        <Route path={"/admin/items"} element={<AdminItemManaging />} />
      </Routes>
    </div>
  );
}

export default App;
