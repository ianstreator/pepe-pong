import { createContext, useState } from "react";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");

  const socketJoin = (username) => {
    setUsername(username);
    const user = io(undefined, {
      query: { username },
    });
    setSocket(user);
  };

  return (
    <SocketContext.Provider
      value={{
        username,
        socket,
        socketJoin,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
