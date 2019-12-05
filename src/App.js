import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import UserItem from "./components/users/UserItem";
import Users from "./components/users/Users";
import User from "./components/users/User";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import "./App.css";

// convert function App() to class App for now & we need to extend the React.Component (but if we import {Component from above then can just say Component})
const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   alert: null
  // };

  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  // Get a single Github user. username is the same as login, which is in User.js and UserItem.js

  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  //Get users repo

  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  //Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  //Set Alert function is passed first to Search.js, which renders the msg and type and is then passed back to App.js
  //App.js then passes the props msg and type to Alert.js because Search.js and Alert.js cannot pass props between each other
  setAlert = (msg, type) => {
    // this just puts the alert into the state so if you try to search with nothing then alert will become an object which will be msg: "please enter message" and type: "light". can also just put alert:{msg, type} and should work
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };
  // render() is a lifecycle method that runs when all the other components are loaded
  render() {
    //All javscript goes under the render() including variables, functions etc.
    const { users, user, repos, loading } = this.state;

    return (
      // JSX must only have ONE parent element, otherwise get warning. So everything must go inside this one div. In chrome developer you'll see everything, including the App div is wrapped around a div called "root".
      //So can replease <di v className="App"><div> with <React.Fragment></React.Fragment>, <Fragment></Fragment> or just <> so that it goes directly from "root" and everything is rendered within
      // Wrapping everything in Router so we can control which stuff goes where
      <Router>
        <div className="App">
          {/* title is a prop that we will pass down to Navbar.js */}
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            {/* rendering Search and Users into Fragments for the route "/" */}
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      // if users.length is more than 0 then showClear is true (which comes from Search.js where if true then show button) or else showClear is set to false so no show
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    {/* loading and users are being passed in as props so that Users.js can access them */}
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
