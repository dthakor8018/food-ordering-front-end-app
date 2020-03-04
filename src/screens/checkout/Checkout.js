import React, { Component } from 'react';
import CheckoutSteps from "./CheckoutSteps";
import Grid from "@material-ui/core/Grid";
import OrderSummary from "./OrderSummary";
import Header from "../../common/header/Header";
import Snackbar from '@material-ui/core/Snackbar';

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            restaurantName: null,
            restaurantId: null,
            cart: null,
            customerAddressData: [],
            paymentMethodsData: [],
            selectedAddress: null,
            selectedPayment: null,
            selectedRestaurant: null,
            cuponData: null,
            orderBillTotal: 0,
            discountAmount: 0,
            error: false,
            erorCode: null,
            errorMsg: null,
            checkOutPageFloatingAlert: false,
            checkOutPageFloatingAlertMsg: "",
        };
    }

    componentWillMount() {
        const { cart, restaurantId, restaurantName } = this.props.history.location.state;
        var orderTotal = cart.reduce((acc, next) => acc + (next.item.price * next.qty), 0);
        this.setState({
            restaurantName: restaurantName,
            selectedRestaurant: restaurantId,
            cart: cart,
            orderBillTotal: orderTotal
        });
        this.getCustomerAddressData();
        this.getPaymentModeData();
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
                    //console.log(json);
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

    getCuponData = (cuponText) => {

        var url = this.props.baseUrl + "/order/coupon/" + cuponText;

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
                    //console.log(json);
                    this.setState({ cuponData: json });
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

    getPaymentModeData = () => {

        var url = this.props.baseUrl + "/payment";

        fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json;charset=UTF-8'
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    console.log(json);
                    this.setState({ paymentMethodsData: json.paymentMethods });
                })
            } else {
                console.log("Error while getting payment Methos" + response.status);
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


    onPlaceOrderCallback = (discountAmount) => {

        //console.log("placeOrder");

        var orderItem = [];
        for (var i = 0; i < this.state.cart.length; i++) {
            orderItem.push({
                "item_id": this.state.cart[i].item.id,
                "price": this.state.cart[i].item.price,
                "quantity": this.state.cart[i].qty
            });
        }
        var url = this.props.baseUrl + "/order";

        fetch(
            url,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json;charset=UTF-8',
                    'authorization': 'Bearer ' + sessionStorage.getItem("access-token")
                },
                body: JSON.stringify({
                    "address_id": this.state.selectedAddress,
                    "bill": this.state.orderBillTotal,
                    "coupon_id": this.state.cuponData && this.state.cuponData.id ? this.state.cuponData.id : "",
                    "discount": discountAmount,
                    "item_quantities": orderItem,
                    "payment_id": this.state.selectedPayment,
                    "restaurant_id": this.state.selectedRestaurant
                })
            }
            ).then((response) => {
            if (response.status === 201) {
                response.json().then((json) => {
                    //console.log(json);
                    this.setState({
                        checkOutPageFloatingAlert: true,
                        checkOutPageFloatingAlertMsg: "Order placed successfully! Your order ID is "+json.id
                    });
                })
            } else {
                console.log("Error while Placing Order" + response.status);
                response.json().then((json) => {
                    this.setState({
                        error: true,
                        erorCode: json.code,
                        errorMsg: json.message,
                        checkOutPageFloatingAlert: true,
                        checkOutPageFloatingAlertMsg: "Unable to place your order! Please try again!"
                    });
                })
            }
        }, error => {
            console.log("Error while making request to FoodOrderingApp Backend", error)
            this.setState({
                error: true,
                erorCode: error.code,
                errorMsg: "Error while making request to FoodOrderingApp Backend",
                checkOutPageFloatingAlert: true,
                checkOutPageFloatingAlertMsg: "Unable to place your order! Please try again!"
            });
        })
    }

    selectedAddressIdCallback = (addressId) => {
        //console.log(addressId)
        this.setState({
            selectedAddress: addressId
        });
    }

    selectedPaymentIdCallback = (paymentId) => {
        //console.log(paymentId)
        this.setState({
            selectedPayment: paymentId
        });
    }


    selectedCuponTextCallback = (cuponText) => {
        this.getCuponData(cuponText);
    }

    closeFloatingAlert = () => {
        this.setState({
            checkOutPageFloatingAlert: false,
            checkOutPageFloatingAlertMsg: ""
        });
    }

    render() {
        return (
            <div>
                <Header {...this.props} showSearchBar={false} />
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <CheckoutSteps {...this.props}
                            customerAddressData={this.state.customerAddressData}
                            paymentMethodsData={this.state.paymentMethodsData}
                            selectedAddressIdCallback={this.selectedAddressIdCallback}
                            selectedPaymentIdCallback={this.selectedPaymentIdCallback}
                        />
                    </Grid>
                    <Grid item xs={3} style={{ padding: '36px' }}>
                        <OrderSummary {...this.props}
                            cart={this.state.cart}
                            restaurantId={this.state.restaurantId}
                            restaurantName={this.state.restaurantName}
                            selectedCuponTextCallback={this.selectedCuponTextCallback}
                            discount={this.state.cuponData && this.state.cuponData.percent ? this.state.cuponData.percent : 0 }
                            onPlaceOrderCallback={this.onPlaceOrderCallback}
                            orderBillTotal={this.state.orderBillTotal}  
                        />
                    </Grid>
                </Grid>
                <Snackbar open={this.state.checkOutPageFloatingAlert}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        autoHideDuration={6000}
                        onClose={this.closeFloatingAlert}
                        message={this.state.checkOutPageFloatingAlertMsg} />
            </div>
        );
    }
}

export default Checkout;
