import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../../constants";
const {purchaseResponses} = constants

import images from "../images/export.js";

import Container from "./shared/Container";
import Button from "./shared/Button";
import Card from "./shared/Card";

import SocketContext from "../context/socketContext";

function Store() {
  const { socket, avatar, setAvatar, myItems, setMyItems } =
    useContext(SocketContext);
  const [purchaseItem, setPurchaseItem] = useState("select an item");
  const navigate = useNavigate();

  if (!socket) window.location.href = "/";

  useEffect(() => {
    socket.on("purchase-response", (data) => {
      if (data === purchaseResponses.OWNED)
        return toast.info("You already own this item.");
      if (data === purchaseResponses.SUCCESSFUL)
        return toast.success("Purchase successful!");
      if (data === purchaseResponses.INSUFFICIENT_FUNDS)
        return toast.error("You have insufficient funds...");
    });
    socket.on("my-items", (data) => {
      setMyItems(data);
    });
    socket.on("set-new-avatar", (data) => {
      setAvatar(data);
    });
    return () => {
      socket.off("purchase-response");
      socket.off("set-new-avatar");
      socket.off("my-items");
    };
  }, [socket]);

  const navLobby = () => {
    navigate("/lobby");
  };
  function getImage(img) {
    return images.items[img];
  }
  const cancel = () => {
    setPurchaseItem("select an item");
  };
  const purchase = () => {
    socket.emit("purchase", purchaseItem);
  };

  function select(e) {
    setPurchaseItem(e.target.value);
  }
  function equip(e) {
    socket.emit("change-avatar", e.target.value);
  }
  const storeItems = Object.entries(images.items).map((e, i) => {
    if (myItems.some((item) => item === e[0])) {
      return (
        <Card
          key={i}
          className={"item-card"}
          children={[
            <h2 key={i} className={"owned"}>
              {"owned"}
            </h2>,
            <img key={i + 1} src={e[1]} width={75}></img>,
            <button
              key={i + 2}
              className={"equip"}
              onClick={equip}
              value={e[0]}
            >
              {"Equip"}
            </button>,
          ]}
        />
      );
    } else {
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
    }
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
