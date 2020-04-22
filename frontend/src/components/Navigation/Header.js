import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Avatar,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  zIndex: {
    position: "fixed",
    zIndex: 1500
  },
  root: {
    background: '#00B5AD',
    height: "64px"
  },
  title: {
    flexGrow: 1,
  },
  userName: {
    marginLeft: '1em',
  },
  logo: {
    background: 'white',
    marginRight: '1em',
  },
});

const Header = (props) => {
  const { name } = props.authorisedUser;
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.zIndex}>
      <Toolbar className={classes.root}>
        <Avatar className={classes.logo} src="/telemed-logo.png" />
        <Typography variant="h6" className={classes.title}>
          Telemedicine App
        </Typography>
        <div>
          <Grid color="inherit" container alignItems="center">
            <AccountCircle />
            <Typography variant="h6" className={classes.userName}>
              {name}
            </Typography>
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
