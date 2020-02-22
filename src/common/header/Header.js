import React, { Component } from 'react';
import './Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Button from "@material-ui/core/Button";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            searchValue: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
        };

    }

    /* get User Profile data */
    // getUserProfile() {
    //     fetch(this.props.baseUrl + "?access_token=" + sessionStorage.getItem("access-token"))
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({ userProfileData: result.data });
    //             },
    //             (error) => {
    //                 console.log("error...", error);
    //             }
    //         );
    // }

    /*check user is logged in or not*/
    componentDidMount() {
        if (this.state.loggedIn === false) {
            this.props.history.push("/");
        }
    }

    menuOpenHandler = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    menuCloseHandler = () => {
        this.setState({ anchorEl: null });
    }
    /* remove the access token when user logout*/
    logoutHandler = () => {
        sessionStorage.removeItem("access-token");
        this.menuCloseHandler();
        this.props.history.push("/");
    }

    /*redirect to profile page*/
    profileRedirect = () => {
        this.props.history.push("/profile");
    }
    /*redirect to home page*/
    homeRedirect = () => {
        this.props.history.push("/home");
    }
    
    render() {
        return (
            <div className="header">
                <div className="title" onClick={this.homeRedirect}>Food Ordering App</div>

                <div className="header-right">
                    {this.props.showSearchBar === true ?
                        <div id="search-field">
                            <div className="searchIcon">
                                <SearchIcon/>
                            </div>
                            <Input className="searchInput" disableUnderline={true}
                                   placeholder="Search..."/>
                        </div> : ""}
                        <Button id="header-login-button" 
                                variant="contained" 
                                color="default" 
                                onClick={this.props.openLoginSignupModal} 
                                startIcon={<AccountCircleRoundedIcon />}>
                            LOGIN
                        </Button>
                    {/* <IconButton id="profile-icon" edge="start" color="inherit" aria-label="menu">
                        {this.state.userProfileData ?
                            <Avatar alt={this.state.userProfileData.full_name} id="profile-icon" fontSize="small"
                                    ariant="circle" src={this.state.userProfileData.profile_picture}
                                    onClick={this.menuOpenHandler}/> : null}
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.menuCloseHandler}
                        >
                            <MenuItem onClick={this.profileRedirect}>My Account</MenuItem>
                            <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </IconButton> */}
                </div>

            </div>

        );
    }


}

export default Header;
