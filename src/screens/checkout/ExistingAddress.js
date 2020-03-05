import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles({
    root: {
        width: '25%',
        display: 'inline-block',
        padding: '10',
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

export default function ExistingAddress(props) {
    const classes = useStyles();
    const [selected, setSelected] = useState("");

    function selectTheAddress(e) {
        //console.log(e.currentTarget.id)
        setSelected(e.currentTarget.id);
        props.selectedAddressIdCallback(e.currentTarget.id)
    }

    return (
        <div>
            {props.customerAddressData ?
                props.customerAddressData.map((addrObj, index) => (
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.flat_building_name}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.locality}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.city}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.state.state_name}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.pincode}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button id={addrObj.id} size="large" onClick={selectTheAddress}><CheckCircleIcon style={selected === addrObj.id ? {fill: "green"} : {fill: "gray"}} /></Button>
                        </CardActions>
                    </Card>))
                : ""}
        </div>
    );
}
