import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import SocketContext from "../context/socketContext";

import Container from "./shared/Container";
import Input from "./shared/Input";
import Button from "./shared/Button";
import { API_BASE_URL } from "../constants";

function Register() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("password");
  const [password_hide_state, setPassword_hide_state] =
    useState("Show Passwords");

  const { handleTextChange, username, setUsername, password, setPassword } =
    useContext(SocketContext);
  const navigate = useNavigate();

  const handleConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
  };
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
    if (username === "" || password === "" || confirmPassword === "")
      return toast.info("please fill out all fields.");
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return toast.error("passwords do not match.");
    }
    const res = await fetch(`${API_BASE_URL}create`, options);
    if (res.status === 400) {
      toast.error("that username is already taken.");
    } else if (res.status === 201) {
      toast.success("account created!");
      navigate("/");
    }
  };
  const showPasswords = () => {
    type === "password" ? setType("text") : setType("password");
    password_hide_state === "Show Passwords"
      ? setPassword_hide_state("Hide Passwords")
      : setPassword_hide_state("Show Passwords");
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
            type={type}
            maxLength={20}
            onChange={handleTextChange}
            value={password}
            placeholder={"Password"}
          />,
          <Input
            key={3}
            type={type}
            maxLength={20}
            onChange={handleConfirmPass}
            value={confirmPassword}
            placeholder={"Confirm password"}
          />,
          <div key={4} className={"check-box"}>
            <p key={1} className={"check-box-message"}>
              {password_hide_state}
            </p>
            ,
            <input
              key={2}
              className={"box"}
              type={"checkbox"}
              onClick={showPasswords}
            />
          </div>,

          <Container
            key={5}
            children={[
              <Button key={2} children={"Create"} onClick={create} />,
              <Button key={1} children={"Cancel"} onClick={navBack} />,
            ]}
          />,
        ]}
      />
    </>
  );
}

export default Register;
