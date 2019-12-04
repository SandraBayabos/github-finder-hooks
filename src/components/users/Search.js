import React from "react";
import PropTypes from "prop-types";

// FORMS ARE ALWAYS COMPONENT-LEVEL STATE. YOU WON'T BRING IT TO APP.JS LEVEL

// CHANGED CLASS COMPONENT TO A FUNCTION-BASED COMPONENT

//IN A FUNCTION, PROPS ARE PASSED IN HERE

const Search = ({ searchUsers, showClear, clearUsers }) => {
  state = {
    text: ""
  };

  // FUNCTION-BASED COMPONENT SO NOW CHANGE ALL INNER FUNCTIONS INTO FUNCTIONS

  const onChange = e => this.setState({ [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };

  // REMOVE THE RENDER FOR FUNCTION-BASED COMPONENTS

  // render() {

  // since the props are passed up top in the function, no need to have this.props anymore

  // const { showClear, clearUsers } = this.props;
  return (
    <div>
      <form onSubmit={this.onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users"
          value={this.state.text}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {/* if this.props.showClear is true then show button  */}
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
  // }
};

//NO MORE STATIC BECAUSE FUNCTION-BASED COMPONENT SO MOVED propTypes BELOW the function
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
