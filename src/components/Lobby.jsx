import Container from "./shared/Container";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { toast } from "react-toastify";

function Lobby() {
  const items = [];
  function create() {
    for (let i = 0; i < 30; i++) {
        items.push({ key: i, class: "test-card" });
    }
    console.log(items);
  }
  create();

  return (
    <>
      <h1>Lobby</h1>
      <div className="Lobby">
        {/* <h1>Lobby</h1> */}
        <Container
          className={"vertical-container"}
          children={[
            <Container key={1} className={"user"} />,
            <Container key={2} className={"match-type"} />,
          ]}
        />

        <Container
          key={3}
          className={"matches"}
          children={
            // <Card key={0} className={"test-card"}/>
            items.map((item) => {
              return <Card key={item.key} className={item.class} />;
            })
          }
        />
      </div>
    </>
  );
}

export default Lobby;
