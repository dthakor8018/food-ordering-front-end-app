import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import './LoginSignupModal.css';
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import FormControl from "@material-ui/core/FormControl";
//import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Container from "@material-ui/core/Container";
import Snackbar from '@material-ui/core/Snackbar';

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
            loginErrorCode: null,
            loginErrorMsg: null,
            sFirstNameRequired: false,
            sFirstName: "",
            sLastName: "",
            sPasswordRequired: false,
            sPassword: "",
            sEmailRequired: false,
            sEmail: "",
            sContactNoRequired: false,
            sContactNo: "",
            signupError: false,
            signupErrorCode: null,
            signupErrorMsg: null,
            floatingAlert: false,
            floatingAlertMsg: "Registered successfully! Please login now!",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
        }
    }
    clearAll(){
        this.setState({
                tab: 'login',
                lUsernameRequired: false,
                lUsername: "",
                lPasswordRequired: false,
                lPassword: "",
                loginError: false,
                loginErrorCode: null,
                loginErrorMsg: null,
                sFirstNameRequired: false,
                sFirstName: "",
                sLastName: "",
                sPasswordRequired: false,
                sPassword: "",
                sEmailRequired: false,
                sEmail: "",
                sContactNoRequired: false,
                sContactNo: "",
                signupError: false,
                signupErrorCode: null,
                signupErrorMsg: null,
                floatingAlert: false
        })
    }
    tabChange = (event, newValue) => {
        console.log(newValue)
        document.getElementById("container-" + this.state.tab + "-form").style.display = 'none';
        this.setState({ tab: newValue });
        document.getElementById("container-" + newValue + "-form").style.display = 'block';


    }
    closeFloatingAlert = () =>{
        this.setState({ floatingAlert: false });
    }
        
    commonInputChangeHandler = e => {
        var stateName = e.target.id;
        var requiredflag =  e.target.id + 'Required';
        var requiredflagVal = false;
        if (!e.target.value) {
            requiredflagVal =  true;
        } else {
            requiredflagVal =  false;
        }
        this.setState({
            [stateName]: e.target.value,
            [requiredflag]: requiredflagVal
        });
    }
    loginClickHandler = () => {
        if( this.state.lUsername === null || this.state.lUsername === "" ) {
            this.setState({ lUsernameRequired: true });
        } else {
            this.setState({ lUsernameRequired: false });
        }
        if( this.state.lPassword === null || this.state.lPassword === "" ) {
            this.setState({ lPasswordRequired: true });
        } else {
            this.setState({ lPasswordRequired: false });
        }
        if (this.state.lUsername !== "" && this.state.lPassword !== "") {
            this.setState({ loginError: false,
                            loginErrorCode: null,
                            loginErrorMsg: null});
            fetch(  
                    this.props.baseUrl + "customer/login",
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            'Accept': 'application/json;charset=UTF-8',
                            'authorization': 'Basic ' + btoa(this.state.lUsername + ':' + this.state.lPassword),
                        }
                    }
                ).then((response) => {
                        if(response.status === 200) {
                            response.json().then((json) => {
                                Object.keys(json).forEach(function(key) {
                                    sessionStorage.setItem(key, json[key]);
                                })
                            })
                            response.headers.forEach((val, key) => {
                                //console.log(key + "=" + val);
                                if (key === "access-token") {
                                    sessionStorage.setItem("access-token", val);
                                }
                            })
                            console.log("login successfully")
                            this.clearAll();  
                            this.props.onCloseLoginSignupModal();

                        } else {
                            console.log("login Error "+response.status);
                            response.json().then((json) => {
                                this.setState({loginError: true,
                                                loginErrorCode: json.code,
                                                loginErrorMsg: json.message});
                                
                            })
                        }
                    }, error => {
                    console.log("Error while making request to FoodOrderingApp Backend",error)
                    this.setState({loginError: true,
                        loginErrorCode: error,
                        loginErrorMsg: "Error while making request to FoodOrderingApp Backend"});
            })
        }
    }
    signupClickHandler = () => {
        if( this.state.sFirstName === null || this.state.sFirstName === "" ) {
            this.setState({ sFirstNameRequired: true });
        } else {
            this.setState({ sFirstNameRequired: false });
        }
        if( this.state.sEmail === null || this.state.sEmail === "" ) {
            this.setState({ sEmailRequired: true });
        } else {
            this.setState({ sEmailRequired: false });
        }
        if( this.state.sPassword === null || this.state.sPassword === "" ) {
            this.setState({ sPasswordRequired: true });
        } else {
            this.setState({ sPasswordRequired: false });
        }
        if( this.state.sContactNo === null || this.state.sContactNo === "" ) {
            this.setState({ sContactNoRequired: true });
        } else {
            this.setState({ sContactNoRequired: false });
        }
        if (this.state.sFirstName !== "" && this.state.sEmailRequired !== "" && this.state.sPassword !== "" && this.state.sContactNo !== "" ) {
            this.setState({ signupError: false,
                            signupErrorCode: null,
                            signupErrorMsg: null});
            fetch(  
                    this.props.baseUrl + "customer/signup",
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            'Accept': 'application/json;charset=UTF-8',
                        },
                        body: JSON.stringify({
                            'contact_number': this.state.sContactNo,
                            'email_address': this.state.sEmail,
                            'first_name': this.state.sFirstName,
                            'last_name': this.state.sLastName,
                            'password': this.state.sPassword
                        })
                    }
                ).then((response) => {
                        if(response.status === 201) {
                            console.log("Signup successfully")
                            this.clearAll();
                            document.getElementById("container-signup-form").style.display = 'none';
                            document.getElementById("container-login-form").style.display = 'block';
                            this.setState({ floatingAlert: true });
                        } else {
                            console.log("login Error "+response.status);
                            response.json().then((json) => {
                                this.setState({signupError: true,
                                               signupErrorCode: json.code,
                                               signupErrorMsg: json.message});
                                
                            })
                        }
                    }, error => {
                    console.log("Error while making request to FoodOrderingApp Backend",error)
                    this.setState({loginError: true,
                        loginErrorCode: error,
                        loginErrorMsg: "Error while making request to FoodOrderingApp Backend"});
            })
        }
    }
    render() {
        return (
            <div>
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
                                    onChange={this.commonInputChangeHandler}
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
                                    onChange={this.commonInputChangeHandler}
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
                                        {this.state.loginErrorMsg}
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
                                    onChange={this.commonInputChangeHandler}
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
                                    onChange={this.commonInputChangeHandler}
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
                                    onChange={this.commonInputChangeHandler}
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
                                    onChange={this.commonInputChangeHandler}
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
                                    onChange={this.commonInputChangeHandler}
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
                                        {this.state.signupErrorMsg}
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
                <Snackbar open={this.state.floatingAlert}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        autoHideDuration={6000}
                        onClose={this.closeFloatingAlert}
                        message={this.state.floatingAlertMsg} />
            </div>
        );
    }
}

export default LoginSignupModal;