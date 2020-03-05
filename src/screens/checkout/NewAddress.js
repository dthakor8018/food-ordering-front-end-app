import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Container from "@material-ui/core/Container";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

export default function NewAddress(props) {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Container id="container-newaddress-form" >
                        <FormControl className="newaddress-flatBuildingNo-form" required>
                            <InputLabel htmlFor="flatBuildingNo">Flat / Building No.</InputLabel>
                            <Input
                                id="flatBuildingNo"
                                type="text"
                            // value={this.state.flatBuildingNo}
                            // onChange={this.commonInputChangeHandler}
                            />
                            {/* {this.state.flatBuildingNoRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null} */}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="newaddress-locality-form">
                            <InputLabel htmlFor="locality">Locality</InputLabel>
                            <Input
                                id="locality"
                                type="text"
                            // value={this.state.sLastName}
                            // onChange={this.commonInputChangeHandler}
                            />
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="newaddress-city-form" required>
                            <InputLabel htmlFor="city">City</InputLabel>
                            <Input
                                id="city"
                                type="text"
                            // value={this.state.sEmail}
                            // onChange={this.commonInputChangeHandler}
                            />
                            {/* {this.state.sEmailRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : this.state.sEmailValidationFailed ? (
                                <FormHelperText>
                                    <span className="red">Invalid Email</span>
                                </FormHelperText>
                            ) : null} */}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="newaddress-state-form" required>
                            <InputLabel htmlFor="state">State</InputLabel>
                            <Select
                                id="state"
                                // value={this.state.sPassword}
                                // onChange={this.commonInputChangeHandler}
                            >
                                <MenuItem value={10}>Delhi</MenuItem>
                                <MenuItem value={20}>Karnataka</MenuItem>
                            </Select>
                            {/* {this.state.sPasswordRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : this.state.sPasswordValidationFailed ? (
                                <FormHelperText>
                                    <span className="red">Password must contain at least one capital letter, one small letter, one number, and one special character</span>
                                </FormHelperText>
                            ) : null} */}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="newaddress-pincode  -form" required>
                            <InputLabel htmlFor="pincode">Pincode</InputLabel>
                            <Input
                                id="pincode"
                                type="text"
                            // value={this.state.sContactNo}
                            // onChange={this.commonInputChangeHandler}
                            />
                            {/* {this.state.sContactNoRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : this.state.sContactNoValidationFailed ? (
                                <FormHelperText>
                                    <span className="red">Contact No. must contain only numbers and must be 10 digits long</span>
                                </FormHelperText>
                            ) : null} */}
                        </FormControl>
                        <br />
                        <br />
                        {/* {this.state.signupError ? (
                            <FormHelperText>
                                <span className="red">
                                    {this.state.newaddressErrorMsg}
                                </span>
                            </FormHelperText>
                        ) : null} */}
                    </Container>
                    <CardActions>
                        <Button variant="contained"
                                color="secondary"
                                onClick={null}>SAVE ADDRESS</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    );
}
