import images from "../images/export.js";
console.log(images);

import Container from "./shared/Container";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { toast } from "react-toastify";

function Store() {
  const items = Object.entries(images.items);
  const storeItems = items.map((e, i) => {
    return { key: i, class: "test-card", img: e[1], name: e[0] };
  });

  return (
    <>
      <h1>Store</h1>
      <div className="Store">
        <Container
          className={"vertical-container"}
          children={[
            <Container key={1} className={"user"} />,
            <Container key={2} className={"purchase-item"} />,
          ]}
        />

        <Container
          key={3}
          className={"items"}
          children={storeItems.map((item) => {
            return (
              <Card
                key={item.key}
                className={item.class}
                children={[
                  <h2 className="item-title">{item.name}</h2>,
                  <img src={item.img} width={100}></img>,
                ]}
              />
            );
          })}
        />
      </div>
    </>
  );
}

export default Store;
