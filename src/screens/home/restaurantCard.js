import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Container } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { EditorFormatAlignCenter } from 'material-ui/svg-icons';

const useStyles = makeStyles({
    root: {
        width: 300,
        margin: 5,
        borderRadius: 5

    },
    media: {
        height: 140,
    },
    ratingText: {
        backgroundColor: "gold",
        color: 'white',
        width: '40%',
        float: 'left',
        textAlign: 'center'
    },
    averagePriceText: {
        color: 'black',
        width: '40%',
        float: 'right',
        paddingTop: 'inherit'
    }
});

export default function RestaurantCard(props) {
    const classes = useStyles();
    console.log(props.restaurantData);
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
        >
            {props.restaurantData &&
                props.restaurantData.map((restObj, index) => (
                    <Grid>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={restObj.photo_URL}
                                    title={restObj.restaurant_name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {restObj.restaurant_name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {restObj.categories}
                                    </Typography>
                                    <br />
                                    <Typography variant="button" className={classes.ratingText} component="span">
                                        <StarIcon /> {Math.round(restObj.customer_rating * 10) / 10}({restObj.number_customers_rated})
                            </Typography>
                                    <Typography variant="caption" color="black" className={classes.averagePriceText} component="span">
                                        &#8377;{restObj.average_price} for two
                            </Typography>
                                </CardContent>
                            </CardActionArea>
                            {/* <CardActions>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={6}>
                                <IconButton
                                    aria-label="add to favorites"
                                >
                                    <i className="fa fa-star-o" aria-hidden="true"/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions> */}
                        </Card>
                    </Grid>
                ))}
            {/* </Container> */}
        </Grid>
    );
}
