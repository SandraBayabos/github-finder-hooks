import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import Users from "./components/users/Users";
import User from "./components/users/User";
// import axios from "axios";
// import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import "./App.css";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  //useState mimics the state below

  // because we used users
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useState({});
  // const [repos, setRepos] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [alert, setAlert] = useState(null);

  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   alert: null
  // };

  // removed searchUsers function

  // Get a single Github user. username is the same as login, which is in User.js and UserItem.js

  // removed getUser from App.js & moved it to GithubState.js
  // const getUser = async username => {
  //   setLoading(true);

  //   const res = await axios.get(
  //     `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );

  //   setUser(res.data);
  //   setLoading(false);
  // };

  //Get users repo
  //REMOVED GETUSERREPOS & MOVED IT TO GITHUBSTATE.JS

  // const getUserRepos = async username => {
  //   setLoading(true);

  //   const res = await axios.get(
  //     `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );

  //   setRepos(res.data);
  //   setLoading(false);
  // };

  // REMOVED CLEARUSERS FROM APP.JS
  // const clearUsers = () => {
  //   setUsers([]);
  //   setLoading(false);
  // };

  //changed setAlert to "showAlert" because setAlert is already used to set the name of the state above

  // const showAlert = (msg, type) => {
  //   setAlert({ msg, type });

  //   setTimeout(() => setAlert(null), 5000);
  // };

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              {/* removed alert={alert} */}
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route
                  exact
                  path="/user/:login"
                  component={User}
                  // removed
                  // <User
                  //   {...props}
                  //   getUser={getUser}
                  //   and
                  //   user={user}
                  //   and
                  //   getUserRepos={getUserRepos}
                  //   repos={repos}
                  // />
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
