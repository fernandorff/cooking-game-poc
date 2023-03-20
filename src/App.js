import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Poc1 } from "./screen/poc1.jsx";
import { SliceIngredient } from "./screen/SliceIngredient";
import { DiceIngredient } from "./screen/DiceIngredient";
import { ProcessIngredient } from "./screen/ProcessIngredient";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar navbar-expand-sm bg-dark px-5">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/poc1" className="nav-link text-light">
                Poc 1
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/process-ingredient-slice" className="nav-link text-light">
                Process Ingredient (slice tomato)
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/process-ingredient-dice" className="nav-link text-light">
                Process Ingredient (dice onion)
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/poc1" element={<Poc1 />} />
          <Route path="/process-ingredient-slice" element={<ProcessIngredient assetName={"tomato"} mode={"slice"} />} />
          <Route path="/process-ingredient-dice" element={<ProcessIngredient assetName={"onion"} mode={"dice"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
