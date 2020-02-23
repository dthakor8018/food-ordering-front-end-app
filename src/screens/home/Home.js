import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import LoginSignupModal from "../../common/modal/LoginSignupModal";
import RestaurantCard from "./restaurantCard";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      openLoginSignupModal: false
    };
  }

  openLoginSignupModal = () => {
    this.setState({
      openLoginSignupModal: true
    })
  }
  onCloseLoginSignupModal = () => {
    this.setState({
      openLoginSignupModal: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
    })    
  }
  logoutHandler = () => {
    this.setState({
      openLoginSignupModal: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
    }) 
  }
  render() {
    return (
      <div>
<<<<<<< HEAD
        <Header {...this.props} showSearchBar={true} loggedIn={this.state.loggedIn} logoutHandler={this.logoutHandler} openLoginSignupModal={this.openLoginSignupModal}/>
=======
        <Header {...this.props} showSearchBar={true} openLoginSignupModal={this.openLoginSignupModal}/>
        <RestaurantCard/>
>>>>>>> fb7b486942689e5a0b3efadad91444f28c7ce365
        <LoginSignupModal {...this.props}
                openLoginSignupModal={this.state.openLoginSignupModal}
                onCloseLoginSignupModal={this.onCloseLoginSignupModal}/>
      </div>
    );
  }
}

export default Home;
