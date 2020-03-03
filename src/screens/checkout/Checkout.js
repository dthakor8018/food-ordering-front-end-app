import React, {Component} from 'react';
import CheckoutSteps from "./CheckoutSteps";
import Grid from "@material-ui/core/Grid";
import OrderSummary from "./OrderSummary";
import Header from "../../common/header/Header";

class Checkout extends Component {

    render() {
        const { cart, restaurantId, restaurantName } = this.props.history.location.state;
        return (
            <div>
                <Header showSearchBar={false} />
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <CheckoutSteps {...this.props}/>
                    </Grid>
                    <Grid item xs={3} style={{padding: '36px'}}>
                       <OrderSummary {...this.props} cart={cart} restaurantId={restaurantId} restaurantName={restaurantName}/>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default Checkout;
