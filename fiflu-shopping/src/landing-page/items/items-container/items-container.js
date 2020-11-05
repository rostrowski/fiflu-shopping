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
  const loadedInitialItems = useSelector(
    (state) => state.shared.loadedInitialItems
  );

  useEffect(() => {
    if (!loadedInitialItems) {
      dispatch(getAllItems());
    }
  }, [loadedInitialItems]);

  const [editMode, setEditMode] = useState(true); // todo should be false
  return (
    <div className="items-container">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <ItemsList items={items} />
          {editMode ? (
            <AddNewItem />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={(_) => setEditMode(!editMode)}
            >
              +
            </Button>
          )}
        </>
      )}
    </div>
  );
};
