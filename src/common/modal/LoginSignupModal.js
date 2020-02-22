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
            usernameRequired: false,
            username: "",
            passwordRequired: false,
            password: "",
            loginError: false,
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
    inputUsernameChangeHandler = e => {
        this.setState({
            username: e.target.value
        });
        if (!e.target.value) {
            this.setState({ usernameRequired: true });
        } else {
            this.setState({ usernameRequired: false });
        }
    };
    inputPasswordChangeHandler = e => {
        this.setState({
            password: e.target.value
        });
        if (!e.target.value) {
            this.setState({ passwordRequired: true });
        } else {
            this.setState({ passwordRequired: false });
        }
    };
    loginClickHandler = () => {
        this.setState({ loginError: false });

        if (this.state.username !== "" && this.state.password !== "") {
            if (
                fetch(
                    this.props.baseUrl + "customer/login",
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            'Accept': 'application/json;charset=UTF-8',
                            'Access-Control-Allow-Headers': true,
                            'authorization': 'Basic ' + btoa(this.state.username + ':' + this.state.password),
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
                }, error => {
                    console.log("Error while login to FoodOrderingApp", error)
                })) {
                //this.props.history.push("/home");
            }
        }
    }
    render() {
        return (
            <Modal disableEnforceFocus
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.openLoginSignupModalModal}
                onClose={this.props.onCloseLoginSignupModalModalModal}
                onBackdropClick={this.props.onCloseLoginSignupModalModalModal}
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
                            <InputLabel htmlFor="username">Contact No.</InputLabel>
                            <Input
                                id="username"
                                type="text"
                                username={this.state.username}
                                onChange={this.inputUsernameChangeHandler}
                            />
                            {this.state.usernameRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type="password"
                                password={this.state.password}
                                onChange={this.inputPasswordChangeHandler}
                            />
                            {this.state.passwordRequired ? (
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
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input
                                id="firstName"
                                type="text"
                                firstName={this.state.firstName}
                                onChange={this.inputfirstNameChangeHandler}
                            />
                            {this.state.firstNameRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form">
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input
                                id="lastName"
                                type="text"
                                lastName={this.state.lastName}
                                onChange={this.inputlastNameChangeHandler}
                            />
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id="email"
                                type="text"
                                email={this.state.email}
                                onChange={this.inputemailChangeHandler}
                            />
                            {this.state.emailRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type="password"
                                password={this.state.password}
                                onChange={this.inputPasswordChangeHandler}
                            />
                            {this.state.passwordRequired ? (
                                <FormHelperText>
                                    <span className="red">required</span>
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                        <br />
                        <br />
                        <FormControl className="login-signup-form" required>
                            <InputLabel htmlFor="contactNo">Contact No.</InputLabel>
                            <Input
                                id="contactNo"
                                type="text"
                                contactNo={this.state.contactNo}
                                onChange={this.inputcontactNoChangeHandler}
                            />
                            {this.state.contactNoRequired ? (
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