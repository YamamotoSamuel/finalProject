import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Secret from "./pages/Secret";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import api from "../api";
import Clock from './pages/Clock'
import { throws } from "assert";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  handleLogoutClick(e) {
    api.logout();
  }
  componentDidMount() {
    console.log(api.isLoggedIn());
    console.log(api.getLocalStorageUser());
    this.setState({
      user: api.getLocalStorageUser()
    });
  }

  addTaskToProfile = (task) => {
    console.log('heyyyyy',this.state, task)
  }







  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="Nav">
          <div className="NavClock">
          <Clock />
          </div>
          <h1 className="App-title">FreeTime App</h1>
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          {/* <NavLink to="/countries">Countries</NavLink>
          <NavLink to="/add-country">Add country</NavLink> */}
          {api.isLoggedIn() && <NavLink to="/profile">Profile</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
          {/* <NavLink to="/secret">Secret</NavLink> */}
          </div>
        </header>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Home {...this.state} {...this.props} addTaskToProfile={this.addTaskToProfile} />}
          />
          <Route path="/about" component={About} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={(props) => <Login {...props} /> } />
          <Route
            path="/profile"
            component={() => <Profile {...this.state} {...this.props} />}
          />
          {/* <Route path="/secret" component={Secret} /> */}
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}
