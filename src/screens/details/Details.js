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
import { ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
class Details extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      restaurantDetails: null,
      error: false,
      erorCode: null,
      errorMsg: null
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
  render() {
    let restDetails = this.state.restaurantDetails
    return (
      <div>
        <Header showSearchBar={false} />
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
                          <ListItemSecondaryAction>
                            <FontAwesomeIcon icon={faPlus} color="gray" />
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    })}
                  </List>
                </div>
              ))}
            </Grid>
            <Grid container item xs={6} direction="column" component="span">
              <MyCart />
              </Grid>
            </Grid>
          </div> : ""}
      </div>
    )
  }
}
export default Details;
