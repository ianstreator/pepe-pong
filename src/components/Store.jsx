import images from "../images/export.js";
// console.log(images);

import Container from "./shared/Container";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { toast } from "react-toastify";
import { useState } from "react";

function Store() {
  const [purchaseItem, setPurchaseItem] = useState(null);

  // console.log(images.items)
  const storeItems = Object.entries(images.items).map((e, i) => {
    // console.log(e);
    // Object.values(e).map((img, index) => {
    //   console.log(e, img[0].split("-")[1]);
    // });
    // e.map((e, i) => {
    // console.log(e.common)
    // console.log(e.uncommon)
    // console.log(e.rare)
    // console.log(e.impossible)
    // console.log(e[0].split("_")[0]);
    const title = e[0].split("_")[0];

    return (
      <Card
        key={i}
        className={"test-card"}
        onClick={function select() {
          setPurchaseItem(
            <Card
              className={"hello"}
              children={[
                <h2 key={i} className={`item-title ${title}`}>
                  {title}
                </h2>,
                <img key={i + 1} src={e[1]} width={100}></img>,
              ]}
            />
          );
        }}
        children={[
          <h2 key={i} className={`item-title ${title}`}>
            {title}
          </h2>,
          <img key={i + 1} src={e[1]} width={100}></img>,
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
            <Container key={1} className={"user"} />,
            <Container
              key={2}
              className={"purchase-item"}
              children={purchaseItem}
            />,
          ]}
        />

        <Container key={3} className={"items"} children={storeItems} />
      </div>
    </>
  );
}

export default Store;
