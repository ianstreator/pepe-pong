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
          <Route path="/" element={[<Login key={1} />, <Toast key={2} />]} />
          <Route path="/Register" element={[<Register key={1} />, <Toast key={2} />]} />
          <Route path="/Lobby" element={[<Lobby key={1} />, <Toast key={2} />]} />
          <Route path="/Store" element={[<Store key={1} />, <Toast key={2} />]} />
          <Route path="/Match" element={[<Match key={1} />, <Toast key={2} />]} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
