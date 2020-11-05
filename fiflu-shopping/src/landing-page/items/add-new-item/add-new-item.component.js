import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addItem } from "../../../shared/shared.slice";

import "./style.css";

const AddNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const onAddNewItemClicked = (e) => {
    e.preventDefault();

    dispatch(addItem(itemName));
    setItemName("");
  };

  return (
    <>
      <form onSubmit={onAddNewItemClicked}>
        <TextField
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          disabled={isLoading}
          className="na"
        />
        <Button
          type="submit"
          className="add-item-button"
          variant="contained"
          color="primary"
        >
          +
        </Button>
      </form>
    </>
  );
};

export default AddNewItem;
