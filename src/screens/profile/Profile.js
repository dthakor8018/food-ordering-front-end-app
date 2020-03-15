import React, { Component } from "react";
import "./Profile.css";
import Header from "../../common/header/Header";

class Profile extends Component {
  componentDidMount() {
    if (sessionStorage.getItem("access-token") === null) {
        this.props.history.push('/');
      }
  }

  render() {
    return (
      <div>
        <Header {...this.props} showSearchBar={false}/>
      </div>
    );
  }
}

export default Profile;
