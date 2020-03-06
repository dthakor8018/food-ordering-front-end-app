import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import RestaurantCard from "./restaurantCard";
import CircularProgress from '@material-ui/core/CircularProgress';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      restaurantData: null,
      error: false,
      erorCode: null,
      errorMsg: null
    };
  }
  componentWillMount() {
    this.getRestaurantData("");
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
          getRestaurantData={this.getRestaurantData} />
        {!this.state.restaurantData ?
          <div class='progress-bar'>
            <CircularProgress />
          </div>
          :
          <RestaurantCard {...this.props} restaurantData={this.state.restaurantData} />
        }
      </div>
    );
  }
}

export default Home;
