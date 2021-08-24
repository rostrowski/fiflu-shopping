import React, { useState } from "react";
import { Button, Menu, MenuItem, SvgIcon } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Menu as MenuIcon } from "@material-ui/icons";

import {
  toggleDraggingMode,
  toggleEditMode,
  openConfirmCleanListModal,
  logout,
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

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleCleanListClick = () => {
    dispatch(openConfirmCleanListModal());
    closeMenu();
  };

  const handleToggleDraggingMode = () => {
    dispatch(toggleDraggingMode());
    closeMenu();
  };

  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
    closeMenu();
  };

  const handleLogoutClicked = () => {
    dispatch(logout());
    closeMenu();
  }

  return (
    <>
      <Button onClick={handleClick}>
        <SvgIcon component={MenuIcon} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleCleanListClick}>Clean list</MenuItem>
        <MenuItem onClick={handleToggleDraggingMode}>
          Set dragging {draggingModeOn ? "off" : "on"}
        </MenuItem>
        <MenuItem onClick={handleToggleEditMode}>
          Set edit mode {editModeOn ? "off" : "on"}
        </MenuItem>
        <MenuItem onClick={handleLogoutClicked}>Logout</MenuItem>
      </Menu>
    </>
  );
};
