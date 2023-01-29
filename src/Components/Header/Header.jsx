import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem"
import {AuthContext} from '../../Context/AuthContext'

function Header() {

    const{user,logoutUser} = useContext(AuthContext)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hello, {user.first_name}
            </Typography>
            <MenuItem>
              <Typography textAlign="center">
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  HOME
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  REGISTER
                </Link>
              </Typography>
            </MenuItem>

            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header