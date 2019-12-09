import React, { useState, useContext } from "react";
// import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

// FORMS ARE ALWAYS COMPONENT-LEVEL STATE. YOU WON'T BRING IT TO APP.JS LEVEL

// CHANGED CLASS COMPONENT TO A FUNCTION-BASED COMPONENT

//IN A FUNCTION, PROPS ARE PASSED IN HERE

// REMOVE SEARCHUSERS and CLEARUSERS and SHOWCLEAR FROM PROPS AND PROPTYPE SINCE IT'S NOW IN REDUCER
const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  //NO MORE STATE, NOW USE USESTATE HOOK TO CREATE THE TEXT STATE
  const [text, setText] = useState("");

  // FUNCTION-BASED COMPONENT SO NOW CHANGE ALL INNER FUNCTIONS INTO FUNCTIONS THEMSELVES

  // CHANGE THIS.SETSTATE TO SETTEXT and can remove the e.target.name object and just pass in e.target.value
  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  // REMOVE THE RENDER FOR FUNCTION-BASED COMPONENTS

  // since the props are passed up top in the function, no need to have this.props anymore

  // const { showClear, clearUsers } = this.props;
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users"
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

//NO MORE STATIC BECAUSE FUNCTION-BASED COMPONENT SO MOVED propTypes BELOW the function
// Search.propTypes = {
//   setAlert: PropTypes.func.isRequired
// };

export default Search;
