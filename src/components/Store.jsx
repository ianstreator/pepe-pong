import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import images from "../images/export.js";

import Container from "./shared/Container";
import Button from "./shared/Button";
import Card from "./shared/Card";

import SocketContext from "../context/socketContext";

function Store() {
  const { socket, avatar } = useContext(SocketContext);
  if (!socket) window.location.href = "/";

  const navigate = useNavigate();
  const navLobby = () => {
    navigate("/lobby");
  };
  const [purchaseItem, setPurchaseItem] = useState("select an item");
  const cancel = () => {
    setPurchaseItem("select an item");
  };
  const purchase = async () => {
    socket.emit("purchase", purchaseItem);
  };
  function getImage(img) {
    return images.items[img];
  }

  useEffect(() => {
    socket.on("purchase-response", (data) => {
      const [type, message] = data;
      switch (type) {
        case 1:
          toast.info(message);
          break;
        case 2:
          toast.success(message);
          break;
        case 3:
          toast.error(message);
          break;
      }
    });
  }, [socket]);
  function select(e) {
    setPurchaseItem(e.target.value);
  }
  const storeItems = Object.entries(images.items).map((e, i) => {
    const title = e[0].split("_")[0];
    let cost;
    if (title === "common") cost = 250;
    if (title === "uncommon") cost = 1000;
    if (title === "rare") cost = 2500;
    if (title === "impossible") cost = 5000;

    return (
      <Card
        key={i}
        className={"item-card"}
        children={[
          <h2 key={i} className={`item-title ${title}`}>
            {title}
          </h2>,
          <img key={i + 1} src={e[1]} width={75}></img>,
          <button
            key={i + 2}
            className={"cost"}
            onClick={select}
            value={e[0]}
          >{`Cost: ${cost}`}</button>,
        ]}
      />
    );
  });

  let hide = {
    display: "none",
  };
  if (purchaseItem !== "select an item") hide = null;
  return (
    <>
      <h1>Store</h1>
      <div className="Store">
        <Container
          className={"vertical-container"}
          children={[
            <Container
              key={1}
              className={"user"}
              children={[
                <img
                  key={1}
                  src={getImage(avatar)}
                  className={"pepe"}
                  width={250}
                ></img>,
                <Button key={2} onClick={navLobby} children={"Lobby"} />,
              ]}
            />,
            <Container
              key={2}
              className={"purchase-item"}
              children={[
                <Card
                  key={1}
                  children={<img src={getImage(purchaseItem)} width={125} />}
                />,
                <Container
                  key={2}
                  children={[
                    <Button
                      key={1}
                      style={hide}
                      className={"purchase-btn"}
                      children={"Purchase"}
                      onClick={purchase}
                    />,
                    <Button
                      key={2}
                      style={hide}
                      className={"cancel-btn"}
                      children={"Cancel"}
                      onClick={cancel}
                    />,
                  ]}
                />,
              ]}
            />,
          ]}
        />

        <Container key={3} className={"items"} children={storeItems} />
      </div>
    </>
  );
}

export default Store;
