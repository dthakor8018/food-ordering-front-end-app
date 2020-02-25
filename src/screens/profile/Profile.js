import React, { Component } from "react";
import "./Profile.css";
import Header from "../../common/header/Header";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      
    };
  }
  componentWillMount() {
    if (this.state.loggedIn === false) {
        this.props.history.push('/');
      }
  }
  logoutHandler = () => {
    sessionStorage.removeItem("access-token");
    this.setState({
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
    })
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <Header {...this.props} showSearchBar={true}
          loggedIn={this.state.loggedIn}
          logoutHandler={this.logoutHandler} />
      </div>
    );
  }
}

export default Profile;
