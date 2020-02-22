import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import './LoginSignupModal.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import AppBar from '@material-ui/core/AppBar';
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Container from "@material-ui/core/Container";


class LoginSignupModal extends Component {
    constructor() {
        super();
        this.state = {
            tab: 'login',
            lUsernameRequired: false,
            lUsername: "",
            lPasswordRequired: false,
            lPassword: "",
            loginError: false,
            sFirstNameRequired: false,
            sFirstName: "",
            sLastName: "",
            sPasswordRequired: false,
            sPassword: "",
            sEmailRequired: false,
            sEmail: "",
            sContactNoRequired: false,
            sContactNo: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            accessToken: null,
            userProfileData: null
        }
    }
    tabChange = (event, newValue) => {
        console.log(newValue)
        document.getElementById("container-" + this.state.tab + "-form").style.display = 'none';
        this.setState({ tab: newValue });
        document.getElementById("container-" + newValue + "-form").style.display = 'block';


    }
    inputlUsernameChangeHandler = e => {
        this.setState({
            lUsername: e.target.value
        });
        if (!e.target.value) {
            this.setState({ lUsernameRequired: true });
        } else {
            this.setState({ lUsernameRequired: false });
        }
    };
    inputlPasswordChangeHandler = e => {
        this.setState({
            lPassword: e.target.value
        });
        if (!e.target.value) {
            this.setState({ lPasswordRequired: true });
        } else {
            this.setState({ lPasswordRequired: false });
        }
    };
    loginClickHandler = () => {
        if( this.state.lUsername == null || this.state.lUsername == "" ) {
            this.setState({ lUsernameRequired: true });
        } else {
            this.setState({ lUsernameRequired: false });
        }
        if( this.state.lPassword == null || this.state.lPassword == "" ) {
            this.setState({ lPasswordRequired: true });
        } else {
            this.setState({ lPasswordRequired: false });
        }
        if (this.state.lUsername != "" && this.state.lPassword != "") {
            this.setState({ loginError: false });
            if( fetch(  
                    this.props.baseUrl + "customer/login",
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            'Accept': 'application/json;charset=UTF-8',
                            'Access-Control-Allow-Headers': true,
                            'authorization': 'Basic ' + btoa(this.state.lUsername + ':' + this.state.lPassword),
                            'credentials': 'true'
                        }
                    }
                ).then((response) => {
                        response.json().then((json) => {
                                console.log(json)
                                this.setState({
                                    userProfileData: json,
                                });
                                sessionStorage.setItem("user-profile", json);
                        })
                        response.headers.forEach((val, key) => {
                            if (key === "access-token") {
                                this.setState({
                                    key: val
                                });
                                sessionStorage.setItem("access-token", val);
                            }
                        })
                        console.log("login successfully")
                        this.props.onCloseLoginSignupModal();
                    }, error => {
                    console.log("Error while login to FoodOrderingApp", error)
                    this.setState({ loginError: true });
                })){
                    this.setState({ lUsername: "",
                                lPassword: "" })
                }
                
                
        }
    }
    render() {
        return (
            <Modal disableEnforceFocus
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.openLoginSignupModal}
                onClose={this.props.onCloseLoginSignupModal}
                onBackdropClick={this.props.onCloseLoginSignupModal}
            >
                <div class="modal-div">
                    <Tabs value={this.state.tab} indicatorColor="primary" textColor="primary"
                        aria-label="disabled tabs example" defaultActiveKey='Login' onChange={(evt, value) => this.tabChange(evt, value)} >
                        <Tab label="Login" value={'login'} eventKey="login" />
                        <Tab label="Signup" value={'signup'} eventKey="Signup" />
                    </Tabs>
                     {/******************* Login Form *******************/}
                    <Container id="container-login-form"  >
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="lUsername">Contact No.</InputLabel>
                            <Input
                                id="lUsername"
                                type="text"
                                value={this.state.lUsername}
                                onChange={this.inputlUsernameChangeHandler}
                            />
                            {this.state.lUsernameRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="lPassword">Password</InputLabel>
                            <Input
                                id="lPassword"
                                type="password"
                                value={this.state.lPassword}
                                onChange={this.inputlPasswordChangeHandler}
                            />
                            {this.state.lPasswordRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        {this.state.loginError ? (
                            <FormHelperText>
                                <span className="red">
                                    Incorrect username and/or password
                                </span>
                            </FormHelperText>
                        ) : null}
                        <br />
                        <Container className="login-button-container">
                        <Button
                            className="login-button"
                            variant="contained"
                            color="primary"
                            onClick={this.loginClickHandler}
                        >
                            LOGIN
                        </Button>
                        </Container>
                        <br />
                    </Container>

                    {/******************* Signup Form *******************/}
                    <Container id="container-signup-form" >
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="sFirstName">First Name</InputLabel>
                            <Input
                                id="sFirstName"
                                type="text"
                                value={this.state.sFirstName}
                                onChange={this.inputsFirstNameChangeHandler}
                            />
                            {this.state.sFirstNameRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form">
                            <InputLabel htmlFor="sLastName">Last Name</InputLabel>
                            <Input
                                id="sLastName"
                                type="text"
                                value={this.state.sLastName}
                                onChange={this.inputsLastNameChangeHandler}
                            />
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="sEmail">Email</InputLabel>
                            <Input
                                id="sEmail"
                                type="text"
                                value={this.state.sEmail}
                                onChange={this.inputsEmailChangeHandler}
                            />
                            {this.state.sEmailRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="sPassword">Password</InputLabel>
                            <Input
                                id="sPassword"
                                type="password"
                                value={this.state.sPassword}
                                onChange={this.inputsPasswordChangeHandler}
                            />
                            {this.state.sPasswordRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="sContactNo">Contact No.</InputLabel>
                            <Input
                                id="sContactNo"
                                type="text"
                                value={this.state.sContactNo}
                                onChange={this.inputsContactNoChangeHandler}
                            />
                            {this.state.sContactNoRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        {this.state.signupError ? (
                            <FormHelperText>
                                <span className="red">
                                    Incorrect username and/or password
                                </span>
                            </FormHelperText>
                        ) : null}
                        <br />
                        <Container className="signup-button-container">
                            <Button
                                className="signup-button"
                                variant="contained"
                                color="primary"
                                onClick={this.signupClickHandler}
                            >
                                SIGNUP
                            </Button>
                        </Container>
                        <br />
                    </Container>
                </div>
            </Modal>
        );
    }
}

export default LoginSignupModal;