import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-toastify";

import Container from "./shared/Container";
import Input from "./shared/Input";
import Button from "./shared/Button";
import SocketContext from "../context/socketContext";
import API_BASE_URL from "./constants.js";

function Login() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const { socketJoin, username, password, handleTextChange } =
    useContext(SocketContext);
  // const handleTextChange = (e) => {
  //   e.target.type === "password"
  //     ? setPassword(e.target.value)
  //     : setUsername(e.target.value);
  // };
  const navigate = useNavigate();
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
    const res = await fetch(`${API_BASE_URL}login`, options);
    if (res.status === 400) {
      toast.error("username or password was invalid..");
      setUsername("");
      setPassword("");
    } else if (res.status === 409) {
      toast.error(
        "this account has been disabled, please contact support about it's status."
      );
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
            type={"text"}
            maxLength={10}
            onChange={handleTextChange}
            value={username}
            placeholder={"Username"}
          />,
          <Input
            key={2}
            type={"password"}
            maxLength={20}
            onChange={handleTextChange}
            value={password}
            placeholder={"Password"}
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
