import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { LandingPage } from "./landing-page";
import { ackError } from "./shared/shared.slice";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function App() {
  const error = useSelector((state) => state.shared.error);
  const dispatch = useDispatch();

  const hideErrorAlert = () => {
    dispatch(ackError());
  };

  return (
    <>
      <Snackbar severity="error" open={!!error} message={<div>dupa1</div>}>
        <Alert onClose={hideErrorAlert} severity="error">
          {error?.message}
        </Alert>
      </Snackbar>
      <LandingPage />
    </>
  );
}

export default App;
