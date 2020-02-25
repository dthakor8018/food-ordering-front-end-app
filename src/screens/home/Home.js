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
      openLoginSignupModal: false,
      restaurantData: null,
      error: false,
      erorCode: null,
      errorMsg: null
    };
  }
  componentWillMount() {
    this.getRestaurantData("");
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
  getRestaurantData = (searchText) => {
    //console.log(searchText);
    var url = this.props.baseUrl + "restaurant";

    if (searchText !== null && searchText.trim() !== "") {
      url += "/name/" + searchText;
    }
    fetch(
      url,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json;charset=UTF-8',
        }
      }
    ).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          //console.log(json);
          this.setState({ restaurantData: json.restaurants });
        })
      } else {
        console.log("login Error " + response.status);
        response.json().then((json) => {
          this.setState({
            error: true,
            erorCode: json.code,
            errorMsg: json.message
          });
        })
      }
    }, error => {
      console.log("Error while making request to FoodOrderingApp Backend", error)
      this.setState({
        error: true,
        erorCode: error.code,
        errorMsg: "Error while making request to FoodOrderingApp Backend"
      });
    })
  }
  render() {
    return (
      <div>
        <Header {...this.props} showSearchBar={true}
          loggedIn={this.state.loggedIn}
          logoutHandler={this.logoutHandler}
          openLoginSignupModal={this.openLoginSignupModal}
          getRestaurantData={this.getRestaurantData} />
        <RestaurantCard {...this.props} restaurantData={this.state.restaurantData} />
        <LoginSignupModal {...this.props}
          openLoginSignupModal={this.state.openLoginSignupModal}
          onCloseLoginSignupModal={this.onCloseLoginSignupModal} />
      </div>
    );
  }
}

export default Home;
