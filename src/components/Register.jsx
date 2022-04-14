import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "./shared/Container";
import Input from "./shared/Input";
import Button from "./shared/Button";

function Register() {
  let navigate = useNavigate();
  const navBack = () => {
    navigate("/");
  };
  const toasty = () => {
    const create = () => {
      const newUser = new Promise((res, rej) => {
        setTimeout(() => {
          if (Math.random() < 0.5) {
            res();
          } else {
            rej();
          }
        }, 2000);
      });
      return newUser;
    };
    toast.promise(create, {
      pending: "pending...",
      success: "success!",
      error: "[error]",
    });
  };
  return (
    <>
      <h1>Register</h1>
      <Container
        className={"Home-form"}
        children={[
          <Input key={1} type={"username"} maxLength={10} />,
          <Input key={2} type={"password"} maxLength={20} />,
          <Container
            key={3}
            className={"buttons"}
            children={[
              <Button key={1} children={"Cancel"} onClick={navBack} />,
              <Button key={2} children={"Create"} onClick={toasty} />,
            ]}
          />,
        ]}
      />
    </>
  );
}

export default Register;
