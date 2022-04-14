import "./App.css";
import "./components/components.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Lobby from "./components/Lobby";
import Store from "./components/Store";
import Match from "./components/Match";
import Toast from "./components/shared/Toast";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={[<Login />, <Toast />]} />
          <Route path="/Register" element={[<Register />, <Toast />]} />
          <Route path="/Lobby" element={[<Lobby />, <Toast />]} />
          <Route path="/Store" element={[<Store />, <Toast />]} />
          <Route path="/Match" element={[<Match />, <Toast />]} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
