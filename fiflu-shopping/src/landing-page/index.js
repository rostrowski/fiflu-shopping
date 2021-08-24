import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import OpenCreateList from "./open-create-list/open-create-list.component";

import "./style.css";
import { ItemsContainer } from "./items/items-container/items-container";
import { FifluMenu } from "./menu/fiflu-menu";
import { subscribeToItemsApi, subscribeToItemsOrderApi } from "../firebase/api";
import { receiveItems, receiveOrder } from "../shared/shared.slice";
import { mergeWithOrder } from "../shared/merge-with-order";
import { ConfirmCleanListDialog } from "./confirm-clean-list-dialog";

export const LandingPage = () => {
  const [order, setOrder] = useState([]);
  const [items, setItems] = useState([]);
  const listId = useSelector((state) => state.shared.listId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (listId) {
      subscribeToItemsApi((items) => {
        setItems(items);
      }, listId);

      subscribeToItemsOrderApi((order) => {
        setOrder(order);
      }, listId);
    }
  }, [listId]);

  useEffect(() => {
    dispatch(receiveItems(mergeWithOrder(items, order)));
    dispatch(receiveOrder(order));
  }, [items, order, dispatch]);

  return [
    <ConfirmCleanListDialog />,
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
    </div>,
  ];
};
