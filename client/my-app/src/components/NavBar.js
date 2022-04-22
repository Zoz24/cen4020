import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import logo from './logo.svg';
import { height, width } from "@mui/system";
import ProfileIcon from './BaseballPlayer.jpg';
import { useNavigate } from "react-router";

export default function ButtonAppBar(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let navigate = useNavigate()
  
  const Logoff = () => {
    
    window.localStorage.clear();
    props.setUserInfo({username: null, isLoggedIn: false})
    navigate('/')
  };
  const GoToUser = () => {
    navigate('/userinfo')
  }
  const GoToTeams = () => {
    navigate('/teams')
  }
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title = 'Home'>
        <IconButton
            onClick={GoToTeams}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          </Tooltip>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sportsball Statistics LLC
          </Typography>
         <Box sx={{ flexGrow: 1 }}> <img src={logo} style={{width: '20%', height: '20%'}} /></Box>
          <Tooltip title="Profile">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar src={ProfileIcon} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={GoToUser}>Account Details</MenuItem>
            <MenuItem onClick={Logoff}>Log Off</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
