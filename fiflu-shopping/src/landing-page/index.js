import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import OpenCreateList from "./open-create-list/open-create-list.component";

import "./style.css";
import { ItemsContainer } from "./items/items-container/items-container";
import { FifluMenu } from "./menu/fiflu-menu";
import { subscribeToItemsApi } from "../firebase/api";
import { receiveItems } from "../shared/shared.slice";

export const LandingPage = () => {
  const listId = useSelector((state) => state.shared.listId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (listId) {
      const unsubscribe = subscribeToItemsApi(
        (items) => dispatch(receiveItems(items)),
        listId
      );
    }
  }, [listId]);

  return (
    <div className="container">
      <div className="login-box">
        <div className="box-container">
          <div className="image-box" />

          <div className="list-form">
            {listId && (
              <div className="fiflu-menu">
                <FifluMenu />
              </div>
            )}
            {listId ? <ItemsContainer /> : <OpenCreateList />}
          </div>
        </div>
      </div>
    </div>
  );
};
