import React from 'react';
import "./MyCart.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, ListItemAvatar, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faCircle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
// import { faRupeeSign, faCircle, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'


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
        <Badge badgeContent={4} color="primary">
          <ShoppingCartIcon />
        </Badge>
          <Typography variant="h5" component="div">
            My Cart
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <FontAwesomeIcon icon={faCircle} color="green" />
              </ListItemAvatar>
              <ListItemText style={{ width: '30%' }} color="textSecondary"  >{"Test Item"}</ListItemText>
              <ListItemText>
                <Typography variant="body1" color="textPrimary"><FontAwesomeIcon icon={faMinus} />{" "+1+" "}<FontAwesomeIcon icon={faPlus} /></Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="body1" color="textSecondary"><FontAwesomeIcon icon={faRupeeSign} />140</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
            <ListItemText style={{ width: '60%' }}>
                <Typography variant="body1" color="textPrimary">TOTAL AMOUNT</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="body1" color="textPrimary"><FontAwesomeIcon icon={faRupeeSign} />140</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth={true} color="primary">CHECKOUT</Button>
        </CardActions>
      </Card>
    </div>
  );
}