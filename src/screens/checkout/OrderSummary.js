import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemAvatar} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faRupeeSign} from "@fortawesome/free-solid-svg-icons";
import ListItemText from "@material-ui/core/ListItemText";


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

export default function OrderSummary() {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Summary
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Restaurant Name
                    </Typography>
                    <Divider/>
                    <List>

                        <ListItem>
                            <ListItemAvatar>
                                <FontAwesomeIcon icon={faCircle} color="green"/>
                            </ListItemAvatar>
                            <ListItemText style={{width: '30%'}} primary="test"/>
                            <ListItemText>
                                <Typography variant="body1" color="textPrimary">1</Typography>
                            </ListItemText>
                            <ListItemText>
                                <Typography variant="body1" color="textPrimary"><FontAwesomeIcon icon={faRupeeSign}/>140</Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Divider/>
                    <Typography className={classes.pos} color="textSecondary">
                        Net Amount
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth={true} color="primary">Place Order</Button>
                </CardActions>
            </Card>
        </div>
    );
}
