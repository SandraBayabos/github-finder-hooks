import React, { useReducer } from "react";
import axios from "axios";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // set Alert
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    });
    // setAlert({ msg, type });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
    // setTimeout(() => setAlert(null), 5000);
  };

  // Everything within the AlertContext.Provider tags will be available in the entire app
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
