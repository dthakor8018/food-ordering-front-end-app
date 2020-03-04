import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemAvatar, Input } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { faStopCircle } from "@fortawesome/free-regular-svg-icons";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function getOrderBillTotal(props) {
    return props.cart.reduce((acc, next) => acc + (next.item.price * next.qty), 0);
}

export default function OrderSummary(props) {
    const classes = useStyles();
    let cart = props.cart;
    const [orderBillTotal , setOrderBillTotal] = React.useState(getOrderBillTotal(props));  

    function onApply() {
        var cuponText = document.getElementById('cupon-text').value;
        props.selectedCuponTextCallback(cuponText);
    }

    function onPlaceOrder() {
        console.log("onPlaceOrder");
        props.onPlaceOrderCallback(orderBillTotal, props.discount * orderBillTotal / 100);
    }
        
    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Summary
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.restaurantName}
                    </Typography>
                    <Divider />
                    <List>
                        {cart && cart.length > 0 ? cart.map((cartItem, index) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <FontAwesomeIcon icon={faStopCircle} color={cartItem.item.item_type === "VEG" ? "green" : "red"} />
                                </ListItemAvatar>
                                <ListItemText style={{ width: '30%' }} color="textSecondary" >{cartItem.item.item_name[0].toUpperCase() + cartItem.item.item_name.slice(1)}</ListItemText>
                                <ListItemText>
                                    <Typography variant="body1" color="textPrimary">{cartItem.qty}</Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography variant="body1" color="textSecondary"><FontAwesomeIcon icon={faRupeeSign} />{cartItem.item.price * cartItem.qty}</Typography>
                                </ListItemText>
                            </ListItem>)) : " "
                        }
                    </List>
                    <List>
                        <ListItem>
                            <ListItemText style={{ width: '60%'}}>
                                <TextField id="cupon-text" style={{ backgroundColor: '#fbffbd'}} label="Cupon Code" type="string" variant="filled" />
                            </ListItemText>
                            <ListItemText style={{ width: '10%'}}>
                                
                            </ListItemText>
                            <ListItemText>
                                <Button variant="contained" color="gray" onClick={onApply} >APPLY</Button>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText style={{ width: '60%' }}>
                                <Typography variant="body1" color="textSecondary">Sub Total</Typography>
                            </ListItemText>
                            <ListItemText>
                                <Typography variant="body1" color="textSecondary"><FontAwesomeIcon icon={faRupeeSign} />
                                    {orderBillTotal}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText style={{ width: '60%' }}>
                                <Typography variant="body1" color="textSecondary">Discount</Typography>
                            </ListItemText>
                            <ListItemText>
                                <Typography variant="body1" color="textSecondary"><FontAwesomeIcon icon={faRupeeSign} />
                                    { props.discount * orderBillTotal / 100 }
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemText style={{ width: '60%' }}>
                                <Typography variant="body1" color="textPrimary">Net Amount</Typography>
                            </ListItemText>
                            <ListItemText>
                                <Typography variant="body1" color="textPrimary"><FontAwesomeIcon icon={faRupeeSign} />
                                    {orderBillTotal - (props.discount * orderBillTotal / 100 ) }
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>

                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth={true} color="primary" onClick={onPlaceOrder} >Place Order</Button>
                </CardActions>
            </Card>
        </div >
    );
}
