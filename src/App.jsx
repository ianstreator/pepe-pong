import "./components/components.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/socketContext";

import Login from "./components/Login";
import Register from "./components/Register";
import Lobby from "./components/Lobby";
import Store from "./components/Store";
import Match from "./components/Match";
import Toast from "./components/shared/Toast";

function App() {
  return (
    <div className="App">
      <Toast />

      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={[<Login />]} />
            <Route path="/Register" element={[<Register />]} />
            <Route path="/Lobby" element={[<Lobby />]} />
            <Route path="/Store" element={[<Store />]} />
            <Route path="/Match" element={[<Match />]} />
          </Routes>
        </Router>
      </SocketProvider>
    </div>
  );
}

export default App;
