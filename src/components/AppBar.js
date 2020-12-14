import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import {UserContext} from '../UserContext'
import './AppBar__BookShare.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
  

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const {user, setUser} = useContext(UserContext);
  const homePage = () => {
    history.push('/')
  }
  const handleLogin = () => {
    history.push('Login')
  }
  const handleSignUp = () => {
    history.push('SignUp')
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         
         <Typography  variant="h6" className={classes.title}>
            <Button style={{color: 'white'}} onClick = {homePage}>BookShare</Button>
          </Typography>
          
         {user ?  <Button onClick={() =>   window.location.reload(false)} color="inherit">LogOut</Button>: 
           <div>
            <Button onClick={handleLogin} color="inherit">Login</Button>
            <Button onClick={handleSignUp} color="inherit">SignUp</Button>
           </div>
           }
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
