import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-toastify";

import Container from "./shared/Container";
import Input from "./shared/Input";
import Button from "./shared/Button";
import SocketContext from "../context/socketContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { socketJoin } = useContext(SocketContext);
  const handleTextChange = (e) => {
    e.target.type === "password"
      ? setPassword(e.target.value)
      : setUsername(e.target.value);
    if (e.target.value === "hello") {
      e.target.value = "";
    }
  };
  let navigate = useNavigate();
  const nav = () => {
    navigate("/register");
  };
  const data = {
    username: username,
    password: password,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const login = async () => {
    if (username === "" || password === "") return;
    const res = await fetch("http://localhost:4000/login", options);
    if (res.status === 400) {
      toast.error("username or password was invalid..");
      setUsername("");
      setPassword("");
    } else if (res.status === 200) {
      await socketJoin(username);
      navigate("/lobby");
    }
    console.log(res.status);
  };
  return (
    <>
      <h1>Login</h1>
      <Container
        className={"Home-form"}
        children={[
          <Input
            key={1}
            type={"username"}
            maxLength={10}
            onChange={handleTextChange}
            value={username}
          />,
          <Input
            key={2}
            type={"password"}
            maxLength={20}
            onChange={handleTextChange}
            value={password}
          />,
          <Container
            key={3}
            children={[
              <Button key={1} children={"Register"} onClick={nav} />,
              <Button key={2} children={"Login"} onClick={login} />,
            ]}
          />,
        ]}
      />
    </>
  );
}

export default Login;
