import React, { useState } from "react";
import { Button, Menu, MenuItem, SvgIcon } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Menu as MenuIcon } from "@material-ui/icons";

import {
  deleteAllItems,
  toggleDraggingMode,
  toggleEditMode,
} from "../../shared/shared.slice";

import "./style.css";

export const FifluMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const draggingModeOn = useSelector((state) => state.shared.draggingModeOn);
  const editModeOn = useSelector((state) => state.shared.editModeOn);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCleanListClick = () => {
    dispatch(deleteAllItems());
    handleClose();
  };

  const handleToggleDraggingMode = () => {
    dispatch(toggleDraggingMode());
    handleClose();
  };

  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClick}>
        <SvgIcon component={MenuIcon} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCleanListClick}>Clean list</MenuItem>
        <MenuItem onClick={handleToggleDraggingMode}>
          Set dragging {draggingModeOn ? "off" : "on"}
        </MenuItem>
        <MenuItem onClick={handleToggleEditMode}>
          Set edit mode {editModeOn ? "off" : "on"}
        </MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};
