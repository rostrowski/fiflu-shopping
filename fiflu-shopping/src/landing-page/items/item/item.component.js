import React, { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TripOriginRounded as CircleIcon,
  CheckRounded as CheckIcon,
} from "@material-ui/icons";
import { SvgIcon } from "@material-ui/core";

import "./style.css";
import { toggleItemCrossed } from "../../../shared/shared.slice";

const Item = forwardRef(({ name, crossedOut, id, ...props }, ref) => {
  const draggingModeOn = useSelector((state) => state.shared.draggingModeOn);
  const dispatch = useDispatch();

  const onItemClicked = () => {
    if (!draggingModeOn) {
      dispatch(toggleItemCrossed(id));
    }
  };

  return (
    <div className="item" ref={ref} {...props} onClick={onItemClicked}>
      <span className={crossedOut ? "item-crossed-name" : ""}>
        <span className={crossedOut ? "item-crossed-name-text" : ""}>
          {name}
        </span>
      </span>

      <SvgIcon
        className={crossedOut ? "check-icon" : "no-check-icon"}
        component={crossedOut ? CheckIcon : CircleIcon}
      />
    </div>
  );
});

export default Item;
