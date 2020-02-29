import React, {Component} from 'react';
import CheckoutSteps from "./CheckoutSteps";
import Grid from "@material-ui/core/Grid";
import OrderSummary from "./OrderSummary";

class Checkout extends Component {
    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <CheckoutSteps/>
                    </Grid>
                    <Grid item xs={3} style={{padding: '36px'}}>
                       <OrderSummary/>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default Checkout;
