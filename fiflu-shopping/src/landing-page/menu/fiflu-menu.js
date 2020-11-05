import React, { useState } from "react";
import { Button, Menu, MenuItem, SvgIcon } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Menu as MenuIcon } from "@material-ui/icons";

import { deleteAllItems } from "../../shared/shared.slice";

import "./style.css";

export const FifluMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

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
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};
