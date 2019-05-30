import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import api from "../api";
import Clock from './pages/Clock'

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
          <div className="Nav">
          {/* <div className="NavClock">
          <Clock />
          </div> */}
          <div className="menu">
                     
          <NavLink to="/" exact> <h1 className="App-title">FreeTime App</h1>  </NavLink>
          <NavLink to="/about"><h4>About</h4></NavLink>
          {api.isLoggedIn() && <NavLink to="/profile"><h4>Profile</h4></NavLink>}
          {!api.isLoggedIn() && <NavLink to="/signup"><h4>Signup</h4></NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login"><h4>Login</h4></NavLink>}
          {api.isLoggedIn() && (
          <Link to="/" onClick={e => this.handleLogoutClick(e)}><h4>Logout</h4></Link>
          )}
          </div>

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
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}
