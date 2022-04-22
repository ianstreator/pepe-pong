import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import Container from "./shared/Container";
import Input from "./shared/Input";
import Button from "./shared/Button";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleTextChange = (e) => {
    e.target.type === "password"
      ? setPassword(e.target.value)
      : setUsername(e.target.value);
  };
  let navigate = useNavigate();
  const navBack = () => {
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
    if (username === "" || password === "") return;
    const res = await fetch("http://localhost:4000/create", options);
    if (res.status === 400) {
      toast.error("that username is already taken.");
    } else if (res.status === 200) {
      toast.success("account created!");
      navigate("/");
    }
  };
  // const toasty = () => {
  //   const create = () => {
  //     const newUser = new Promise((res, rej) => {
  //       setTimeout(() => {
  //         if (Math.random() < 0.5) {
  //           res();
  //         } else {
  //           rej();
  //         }
  //       }, 2000);
  //     });
  //     return newUser;
  //   };
  //   toast.promise(create, {
  //     pending: "pending...",
  //     success: "success!",
  //     error: "[error]",
  //   });
  // };
  return (
    <>
      <h1>Register</h1>
      <Container
        className={"Home-form"}
        children={[
          <Input
            key={1}
            type={"username"}
            maxLength={10}
            onChange={handleTextChange}
          />,
          <Input
            key={2}
            type={"password"}
            maxLength={20}
            onChange={handleTextChange}
          />,
          <Container
            key={3}
            className={"buttons"}
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
