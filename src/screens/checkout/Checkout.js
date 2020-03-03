import React, { Component } from 'react';
import CheckoutSteps from "./CheckoutSteps";
import Grid from "@material-ui/core/Grid";
import OrderSummary from "./OrderSummary";
import Header from "../../common/header/Header";

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            customerAddressData: [],
            error: false,
            erorCode: null,
            errorMsg: null
        };
    }

    componentWillMount() {
        this.getCustomerAddressData();
    }
    getCustomerAddressData = () => {

        var url = this.props.baseUrl + "/address/customer";

        fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'authorization': 'Bearer ' + sessionStorage.getItem("access-token")
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    console.log(json);
                    this.setState({ customerAddressData: json.addresses });
                })
            } else {
                console.log("Error while getting customer address" + response.status);
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
        const { cart, restaurantId, restaurantName } = this.props.history.location.state;
        return (
            <div>
                <Header {...this.props} showSearchBar={false} />
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <CheckoutSteps {...this.props} customerAddressData={this.state.customerAddressData}/>
                    </Grid>
                    <Grid item xs={3} style={{ padding: '36px' }}>
                        <OrderSummary {...this.props} cart={cart} restaurantId={restaurantId} restaurantName={restaurantName} />
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default Checkout;
