import React, { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TripOriginRounded as CircleIcon,
  CheckRounded as CheckIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import { SvgIcon } from "@material-ui/core";

import "./style.css";
import { toggleItemCrossed, deleteItem } from "../../../shared/shared.slice";

const Item = forwardRef(({ name, crossedOut, id, ...props }, ref) => {
  const draggingModeOn = useSelector((state) => state.shared.draggingModeOn);
  const editModeOn = useSelector((state) => state.shared.editModeOn);
  const dispatch = useDispatch();

  const onItemClicked = () => {
    if (draggingModeOn) {
      return;
    }

    if (!editModeOn) {
      dispatch(toggleItemCrossed(id));
    }
  };

  const onDeleteIconClicked = () => {
    dispatch(deleteItem(id));
  };

  const renderIcon = () =>
    !editModeOn ? (
      <SvgIcon
        className={crossedOut ? "check-icon" : "no-check-icon"}
        component={crossedOut ? CheckIcon : CircleIcon}
      />
    ) : (
      <SvgIcon component={DeleteIcon} onClick={onDeleteIconClicked} />
    );

  return (
    <div className="item" ref={ref} {...props} onClick={onItemClicked}>
      <span className={crossedOut ? "item-crossed-name" : ""}>
        <span className={crossedOut ? "item-crossed-name-text" : ""}>
          {name}
        </span>
      </span>

      {renderIcon()}
    </div>
  );
});

export default Item;
