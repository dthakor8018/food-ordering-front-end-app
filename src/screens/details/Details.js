import React, { Component } from "react";
import "./Details.css";
import Header from "../../common/header/Header";
import MyCart from "./MyCart"
import Grid from "@material-ui/core/Grid";
import Snackbar from '@material-ui/core/Snackbar';
import RestaurantsDetailsCard from "./RestaurantsDetailsCard";
import RestaurantsMenu from "./RestaurantsMenu";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      restaurantDetails: null,
      cart: [],
      error: false,
      erorCode: null,
      errorMsg: null,
      detailPageFloatingAlert: false,
      detailPageFloatingAlertMsg: ""
    };
  }
  componentWillMount() {
    this.getRestaurantDetails();
  }
  getRestaurantDetails = () => {
    //this.setState({ restaurantId: this.props.match.params.restaurantId});
    var url = this.props.baseUrl + "restaurant/" + this.props.match.params.restaurantId;
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
          console.log(json);
          console.log(typeof (json));
          this.setState({
            restaurantDetails: json
          });
          // var items = {};
          // json.categories.forEach(cat => {
          //   cat.item_list.forEach(item => {
          //     items[item.id] = item;
          //   })
          // });
          // this.setState({
          //   allItems: items
          // });
        })
      } else {
        console.log("Error " + response.status);
        response.json().then((json) => {
          this.setState({
            erro: true,
            errorCode: json.code,
            errorMsg: json.message
          });
        })
      }
    }, error => {
      console.log("Error while making request to FoodOrderingApp Backend", error)
      this.setState({
        erro: true,
        errorCode: error.code,
        errorMsg: "Error while making request to FoodOrderingApp Backend"
      });
    })
  }
  addItemHandler = (item) => {
    //console.log(item);
    var update = false;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].item.id === item.id) {
        cart[i].qty++;
        update = true;
      }
    }
    if(!update) {
      cart.push({'item': item, 'qty': 1 });
    }

    this.setState({cart: cart});
    this.openFloatingAlert();
  }
  incQty = (index) => {
    let cart = this.state.cart
    cart[index].qty++;
    this.setState({cart: cart});
  }
  decQty = (index) => {
    let cart = this.state.cart
    cart[index].qty--;
    if(cart[index].qty < 0 ) {
      cart[index].qty = 0;
    }
    this.setState({cart: cart});
  }
  closeFloatingAlert = () => {
    this.setState({ 
      detailPageFloatingAlert: false,
      detailPageFloatingAlertMsg: ""
    });
  }
  openFloatingAlert = () => {
    this.setState({ 
      detailPageFloatingAlert: true,
      detailPageFloatingAlertMsg: "Item added to cart!"
    });
  }
  render() {
    let restDetails = this.state.restaurantDetails
    return (
        <div>
        <div style={{minWidth:"400px"}}><Header {...this.props} showSearchBar={false} /></div>
      <div>
        {restDetails ?
            <div>
          <div style={{padding: '2rem', backgroundColor: 'lightgray', minWidth:"400px"}}>
<RestaurantsDetailsCard restDetails={restDetails} />
          </div>
            <Grid  container>
              <Grid item xs={6}  style={{minWidth:"400px"}}>
              <RestaurantsMenu restDetails={restDetails} addItemHandler={this.addItemHandler}/>
              </Grid>
            <Grid item xs={6} style={{minWidth:"400px"}}>
              <MyCart {...this.props}
                    cart={this.state.cart}
                    restaurantDetails={this.state.restaurantDetails}
                    incQty={this.incQty}
                    decQty={this.decQty} />
              </Grid>
            </Grid>
          </div> : ""}
          <Snackbar open={this.state.detailPageFloatingAlert}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        autoHideDuration={6000}
                        onClose={this.closeFloatingAlert}
                        message={this.state.detailPageFloatingAlertMsg} />
      </div>
        </div>
    )
  }
}
export default Details;
