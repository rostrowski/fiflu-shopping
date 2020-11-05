import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, CircularProgress } from "@material-ui/core";

import { createListIfDoesntExist } from "../../shared/shared.slice";

import "./style.css";

const OpenCreateList = () => {
  const [listId, setListId] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.shared.loading);
  const onButtonClicked = () => {
    dispatch(createListIfDoesntExist(listId));
  };

  return (
    <>
      <span className="list-id-label">Welcome Back!</span>
      <TextField
        value={listId}
        onChange={(e) => setListId(e.target.value)}
        disabled={isLoading}
        className="list-id-input"
        label="List ID"
      />
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Button
          disabled={!listId}
          variant="contained"
          color="primary"
          onClick={onButtonClicked}
        >
          Go
        </Button>
      )}
    </>
  );
};

export default OpenCreateList;
