import React, { Component } from "react"
import facade from "./apiFacade";
import Chef from "./components/Chef";
import FrontPage from "./components/FrontPage";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" }
  }
  login = (evt) => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }
  onChange = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value })
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.login} onChange={this.onChange} >
          <input type="text" placeholder="User Name" id="username" required />
          <input type="password" placeholder="Password" id="password" required />
          <button>Login</button>
        </form>
      </div>
    )
  }
}
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount() { facade.fetchData().then(res => this.setState({ dataFromServer: res.msg })); }
  render() {
    return (
      <div>
        <Header />
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
        <Content />
      </div>
    )
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false }
  }
  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  } //TODO
  login = (user, pass) => {
    facade.login(user, pass)
      .then(res => this.setState({ loggedIn: true }));
  } //TODO
  render() {
    return (
      <div>
        {!this.state.loggedIn ? (<LogIn login={this.login} />) :
          (
            <Router>
              <div>
                <LoggedIn />
                <button onClick={this.logout}>Logout</button>
              </div>
            </Router>
          )}
      </div>
    )
  }
}
export default App;

const Header = () => {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Welcome</NavLink></li>
      <li><NavLink activeClassName="active" to="/chef">Chef</NavLink></li>
    </ul>
  );
};

const Content = () => {
  return (

    <Switch>
      <Route exact path="/"> <FrontPage /> </Route>
      <Route path="/chef"> <Chef /> </Route>
    </Switch>

  )
}



