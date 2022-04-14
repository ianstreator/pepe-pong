import { useNavigate } from "react-router-dom";

import Container from "./shared/Container";
import Input from "./shared/Input";
import Button from "./shared/Button";

function Login() {
  let navigate = useNavigate();
  const nav = () => {
    navigate("/register");
  };
  return (
    <>
      <h1>Login</h1>
      <Container
        className={"Home-form"}
        children={[
          <Input key={1} type={"username"} maxLength={10} />,
          <Input key={2} type={"password"} maxLength={20} />,
          <Container
            key={3}
            children={[
              <Button key={1} children={"Register"} onClick={nav} />,
              <Button key={2} children={"Login"} />,
            ]}
          />,
        ]}
      />
    </>
  );
}

export default Login;
