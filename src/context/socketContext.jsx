import { createContext, useState } from "react";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [matchKey, setMatchKey] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [oppAvatar, setOppAvatar] = useState(null);
  const [playerType, setPlayerType] = useState(null);
  const [myItems, setMyItems] = useState(null);
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
        matchKey,
        setMatchKey,
        avatar,
        setAvatar,
        oppAvatar,
        setOppAvatar,
        playerType,
        setPlayerType,
        myItems,
        setMyItems
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
