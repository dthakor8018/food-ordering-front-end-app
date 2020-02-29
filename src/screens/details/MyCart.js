import React from 'react';
import "./MyCart.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


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

export default function MyCart() {
  const classes = useStyles();
  return (
    <div>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <ShoppingCartIcon />
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          My Cart
        </Typography>
        <div id="cart">
        </div>
        <Typography className={classes.pos} color="textSecondary">
          TOTAL AMOUNT
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" >CHECKOUT</Button>
      </CardActions>
    </Card>
    </div>
  );
}