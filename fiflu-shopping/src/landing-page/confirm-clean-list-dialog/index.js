import React from "react";
import { Dialog, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  closeConfirmCleanListModal,
  deleteAllItems,
} from "../../shared/shared.slice";

import "./style.css";

export const ConfirmCleanListDialog = () => {
  const isOpen = useSelector(
    (state) => state.shared.isConfirmCleanListModalOpen
  );
  const dispatch = useDispatch();

  const handleYesClick = () => {
    dispatch(deleteAllItems());
    closeModal();
  };

  const closeModal = () => {
    dispatch(closeConfirmCleanListModal());
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={closeModal} style={{ padding: "10px" }}>
        <div className="clean-list-modal-content">
          <div>Are you sure you want to clean the list?</div>
          <div class="clean-list-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={handleYesClick}
            >
              Yes
            </Button>
            <Button variant="contained" color="default" onClick={closeModal}>
              No
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
