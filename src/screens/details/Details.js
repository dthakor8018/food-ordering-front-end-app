import React, { Component } from "react";
import "./Details.css";
import Header from "../../common/header/Header";
import MyCart from "./MyCart"
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faCircle, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Snackbar from '@material-ui/core/Snackbar';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
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
        <Header {...this.props} showSearchBar={false} />
        {restDetails ?
          <div class='root'>
            <Paper class='paper'>
              <Grid container spacing={10}>
                <Grid item>
                  <img id='img-detail-page' alt="complex" src={restDetails.photo_URL} />
                </Grid>
                <Grid item xs={10} sm container>
                  <Grid item xs container direction="column" spacing={2}  >
                    <Grid item xs>
                      <Typography gutterBottom variant="h4" component="h4">
                        {restDetails.restaurant_name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h6">
                        {restDetails.address.locality}
                      </Typography>
                      <Typography variant="body1" color="textPrimary" component="p">
                        {restDetails.categories.map((cat, index) => (
                          cat.category_name + " "
                        ))}
                      </Typography>
                      <br />
                      <br />
                    </Grid>
                    <Grid item xs container direction="row" >
                      <Grid item xs container direction="column" spacing={2}>
                        <Typography variant="body1" color="textPrimary" component="p">
                          <FontAwesomeIcon icon={faStar} /> {Math.round(restDetails.customer_rating * 10) / 10}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {"AVERAGE RATING BY"}<br />{restDetails.number_customers_rated + " CUSTOMERS"}
                        </Typography>
                      </Grid>
                      <Grid item xs container direction="column" spacing={2}>
                        <Typography variant="body1" color="textPrimary" component="p">
                          <FontAwesomeIcon icon={faRupeeSign} />{restDetails.average_price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {"AVERAGE COST FOR"}<br />{"TWO PEOPLE"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Grid class="details-content" container>
            <Grid class='menu-item' container item xs={6} direction="column" component="span">
              {restDetails.categories.map((cat, index) => (
                <div>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {cat.category_name.toUpperCase()}
                  </Typography>
                  <Divider />
                  <List>
                    {cat.item_list.map(item => {
                      return (
                        <ListItem>
                          <ListItemAvatar>
                            {item.item_type === "VEG" ? <FontAwesomeIcon icon={faCircle} color="green" /> : <FontAwesomeIcon icon={faCircle} color="red" />}
                          </ListItemAvatar>
                          <ListItemText style={{ width: '30%' }} primary={item.item_name[0].toUpperCase() + item.item_name.slice(1)} />
                          <ListItemText>
                            <Typography variant="body1" color="textPrimary"><FontAwesomeIcon icon={faRupeeSign} />{item.price}</Typography>
                          </ListItemText>
                          <ListItemText>
                            <FontAwesomeIcon icon={faPlus} color="gray" onClick={ () => this.addItemHandler(item)}/>
                          </ListItemText>
                        </ListItem>
                      )
                    })}
                  </List>
                </div>
              ))}
            </Grid>
            <Grid container item xs={6} direction="column" component="span">
              <MyCart {...this.props}
                    cart={this.state.cart} 
                    restaurantDetails={this.state.restaurantDetails} 
                    loggedIn={this.state.loggedIn}
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
    )
  }
}
export default Details;
