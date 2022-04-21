import images from "../images/export.js";
// console.log(images);

import Container from "./shared/Container";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { toast } from "react-toastify";
import { useState } from "react";

function Store() {
  const [purchaseItem, setPurchaseItem] = useState(<h1>select an item</h1>);
  const cancel = () => {
    setPurchaseItem(<h1>select an item</h1>);
  };

  const storeItems = Object.entries(images.items).map((e, i) => {
    const title = e[0].split("_")[0];
    let cost;
    if (title === "common") cost = 500;
    if (title === "uncommon") cost = 1000;
    if (title === "rare") cost = 2500;
    if (title === "impossible") cost = 5000;

    function select() {
      setPurchaseItem(
        <Card
          className={"test-card"}
          children={[
            <h2 key={i}>{title}</h2>,
            <img key={i + 1} src={e[1]} width={125}></img>,
          ]}
        />
      );
    }

    return (
      <Card
        key={i}
        className={"test-card"}
        onClick={select}
        children={[
          <h2 key={i} className={`item-title ${title}`}>
            {title}
          </h2>,
          <img key={i + 1} src={e[1]} width={75}></img>,
          <h3 key={i + 2} className={"cost"}>
            Cost: {cost}
          </h3>,
        ]}
      />
    );
  });

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
              children={<Card className={"currency"} />}
            />,
            <Container
              key={2}
              className={"purchase-item"}
              children={[
                <Card key={1} children={purchaseItem} />,
                <Container
                  key={2}
                  children={[
                    <Button key={1} children={"Purchase"} />,
                    <Button key={2} children={"Cancel"} onClick={cancel} />,
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
