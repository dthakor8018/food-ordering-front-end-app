import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

const useStyles = makeStyles({
    root: {
        width: '25%',
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

export default function ExistingAddress() {
    const classes = useStyles();
    const [selected, setSelected] = useState(false);

    function selectTheAddress() {
        setSelected(!selected);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.pos} color="textPrimary">
                    303, manar mansion,
                </Typography>
                <Typography className={classes.pos} color="textPrimary">
                    near fairway super market, j.p nagar 5th phase
                </Typography>
                <Typography className={classes.pos} color="textPrimary">
                    mumbai
                </Typography>
                <Typography className={classes.pos} color="textPrimary">
                    maharashtra
                </Typography>
                <Typography className={classes.pos} color="textPrimary">
                    40018
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" onClick={selectTheAddress}>{selected?<FontAwesomeIcon icon={faCheck} color="green" />:<FontAwesomeIcon icon={faCheck} color="grey" />}</Button>
            </CardActions>
        </Card>
    );
}
