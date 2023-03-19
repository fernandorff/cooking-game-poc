import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Poc1 } from "./screen/poc1.jsx";
import { Poc2 } from "./screen/poc2.jsx";
import { SliceIngredient } from "./screen/SliceIngredient";
import { DiceIngredient } from "./screen/DiceIngredient";

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
              <Link to="/slice-ingredient" className="nav-link text-light">
                Slice Ingredient
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dice-ingredient" className="nav-link text-light">
                Dice Ingredient
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/poc1" element={<Poc1 />} />
          <Route
            path="/slice-ingredient"
            element={<SliceIngredient assetName={"tomato"} width={25} initialLeft={"10%"} />}
          />
          <Route
            path="/dice-ingredient"
            element={<DiceIngredient assetName={"tomato"} width={25} initialLeft={"10%"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
