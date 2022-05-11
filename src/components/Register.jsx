import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import SocketContext from "../context/socketContext";

import Container from "./shared/Container";
import Input from "./shared/Input";
import Button from "./shared/Button";
import constants from "./constants.js";

function Register() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleTextChange, username, setUsername, password, setPassword } =
    useContext(SocketContext);
  const handleConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
  };
  const navigate = useNavigate();
  const navBack = () => {
    setUsername("");
    setPassword("");
    navigate("/");
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
  const create = async () => {
    //...check ability to send to server....
    console.log(password, confirmPassword);
    if (username === "" || password === "" || confirmPassword === "")
      return toast.info("please fill out all fields.");
    if (password !== confirmPassword)
      return toast.error("passwords do not match.");
    //...sending to server.....
    const res = await fetch(`${constants.API_BASE_URL}create`, options);
    if (res.status === 400) {
      toast.error("that username is already taken.");
    } else if (res.status === 201) {
      toast.success("account created!");
      navigate("/");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h1>Register</h1>
      <Container
        className={"Home-form"}
        children={[
          <Input
            key={1}
            type={"text"}
            maxLength={10}
            onChange={handleTextChange}
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
          <Input
            key={3}
            type={"password"}
            maxLength={20}
            onChange={handleConfirmPass}
            value={confirmPassword}
            placeholder={"Confirm password"}
          />,
          <Container
            key={4}
            children={[
              <Button key={1} children={"Cancel"} onClick={navBack} />,
              <Button key={2} children={"Create"} onClick={create} />,
            ]}
          />,
        ]}
      />
    </>
  );
}

export default Register;
