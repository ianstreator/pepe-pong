import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [matchKey, setMatchKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [oppAvatar, setOppAvatar] = useState("");
  const [playerType, setPlayerType] = useState("");
  const [myItems, setMyItems] = useState(null);
  // let navigate = useNavigate();

  const socketJoin = (username) => {
    setUsername(username);
    const user = io(undefined, {
      query: { username },
    });
    setSocket(user);
  };
  const handleTextChange = (e) => {
    console.log(e.target.value, "inside context");
    console.log(password);
    e.target.type === "password"
      ? setPassword(e.target.value)
      : setUsername(e.target.value);
  };

  return (
    <SocketContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
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
        setMyItems,
        handleTextChange,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
