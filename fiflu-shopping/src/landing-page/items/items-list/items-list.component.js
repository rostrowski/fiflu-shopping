import React from "react";
import Item from "../item/item.component";

const ItemsList = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <Item name={item.name} />
      ))}
    </>
  );
};

export default ItemsList;
