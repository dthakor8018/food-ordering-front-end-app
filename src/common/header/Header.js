import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  loginbuttonArea:{
    float: 'right',
    maxWidth: 'min-content',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    float: 'left'
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#263238",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    float: 'right',
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function menuCloseHandler(){
    setAnchorEl(null);
  }
  function menuMyAccountHandler(){
    menuCloseHandler();
  }
  
  function logoutHandler(){
    sessionStorage.removeItem("access-token");
    menuCloseHandler();
    props.logoutHandler();
  }
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "#263238" }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <FastfoodIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                className={classes.search}
                style={{ borderBottom: "solid black 0.1rem" }}
              >
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search by Restaurant Name"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={3} style={{ gridColumnStart: "revert" }}>
            <div className={classes.loginbuttonArea} >
                { props.loggedIn ?
                    <IconButton id="profile-icon" edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                        <AccountCircleIcon/>
                        <Typography>{sessionStorage.getItem("first_name")}</Typography>
                    </IconButton>
                  :               
                    <Button variant="contained" onClick={props.openLoginSignupModal}><AccountCircleIcon/>Login</Button>
                }
            </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={menuCloseHandler}
      >
        <MenuItem onClick={menuMyAccountHandler}>My account</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
