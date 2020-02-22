import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import LoginSignupModal from "../../common/modal/LoginSignupModal";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
    };
  }
  render() {
    return (
      <div>
        <Header {...this.props} showSearchBar={true} />
        <LoginSignupModal 
                openLoginSignupModalModal={true}
                onCloseLoginSignupModalModalModal={null}
                onCloseLoginSignupModalModalModal={null}/>
      </div>
    );
  }
}

export default Home;
