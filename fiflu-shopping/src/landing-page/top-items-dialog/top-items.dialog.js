import React from "react";
import { Slide, Dialog } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { closeTopItemsModal } from "../../shared/shared.slice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TopItemsDialog = () => {
  const isOpen = useSelector((state) => state.shared.isTopItemsModalOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeTopItemsModal());
  };

  return (
    <div>
      <Dialog
        fullscreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div>dupa</div>
      </Dialog>
    </div>
  );
};
