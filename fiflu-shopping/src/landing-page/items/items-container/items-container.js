import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import ItemsList from "../items-list/items-list.component";
import AddNewItem from "../add-new-item/add-new-item.component";

import "./style.css";
import { getAllItems } from "../../../shared/shared.slice";

export const ItemsContainer = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shared.items);
  const isLoading = useSelector((state) => state.shared.loading);
  const editModeOn = useSelector((state) => state.shared.editModeOn);
  const loadedInitialItems = useSelector(
    (state) => state.shared.loadedInitialItems
  );

  useEffect(() => {
    if (!loadedInitialItems) {
      dispatch(getAllItems());
    }
  }, [loadedInitialItems]);

  return (
    <div className="items-container">
      {isLoading && !loadedInitialItems ? (
        <CircularProgress />
      ) : (
        <>
          <ItemsList items={items} />
          {editModeOn && <AddNewItem />}
        </>
      )}
    </div>
  );
};
