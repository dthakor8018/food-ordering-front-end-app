import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRupeeSign, faStar} from "@fortawesome/free-solid-svg-icons";
import Paper from "@material-ui/core/Paper";

function RestaurantsDetailsCard(restDetails) {
    var {restDetails} = this.props;
    return (
        <div>
            <Grid container spacing={10} style={{minWidth:'400px'}}>
                <Grid item xs={2}>
                    <img id='img-detail-page' alt="complex" src={restDetails.photo_URL} />
                </Grid>
                <Grid item xs={10} >
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
        </div>
    );
}

export default RestaurantsDetailsCard;
