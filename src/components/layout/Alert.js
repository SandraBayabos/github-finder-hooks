import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

//the Alert component only displays the alert on the screen

// as long as alert is not null, then show a div with the message and give it a className of type

// alert is being passed in as props, which is the same as passing in props and then saying this.props.alert.type and this.props.alert.msg

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    )
  );
};

export default Alert;
