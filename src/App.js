import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Poc1 } from "./screen/poc1.jsx";
import { Poc2 } from "./screen/poc2.jsx";

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
              <Link to="/poc2" className="nav-link text-light">
                Poc 2
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/poc1" element={<Poc1 />} />
          <Route path="/poc2" element={<Poc2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
