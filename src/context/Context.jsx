import { createContext, useState } from "react";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socketContext = createContext();

function Context() {
  const [socket, setSocket] = useState(null);
  
  return <div>Context</div>;
}

export default Context;
