import images from "../images/export.js";


import Container from "./shared/Container";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const navigate = useNavigate();
  const navStore = () => {
    navigate("/store");
  };
  const items = [];
  function create() {
    for (let i = 0; i < 30; i++) {
      items.push({ key: i, class: "test-card" });
    }
  }
  create();

  return (
    <>
      <h1>Lobby</h1>
      <div className="Lobby">
        <Container
          className={"vertical-container"}
          children={[
            <Container
              key={1}
              className={"user"}
              children={[
                <img
                  key={1}
                  src={images.pepe}
                  className={"pepe"}
                  width={250}
                ></img>,
                <Button key={2} onClick={navStore} children={"Store"} />,
              ]}
            />,
            <Container key={2} className={"match-type"} />,
          ]}
        />

        <Container
          key={3}
          className={"matches"}
          children={items.map((item) => {
            return <Card key={item.key} className={item.class} />;
          })}
        />
      </div>
    </>
  );
}

export default Lobby;
