import React from "react";
import "./home_page.css";
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { Link } from "react-router-dom";
import AccountAPI from "./test_data/test_users.js";


const HomePage = () => { 
    return (
      <Container component="main" maxWidth="sm">
        <Grid container>
          <Typography variant="h4" color="primary" align="center">
            Welcome to Telemedicine Demo &nbsp;&nbsp;
          </Typography>
          <Avatar src="./telemed-logo.png" />
        </Grid>
        <Grid container justify="center" spacing={8}>
          <Grid item xs={6}>
          <Typography variant="h6">
           Sign In
          </Typography>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />

              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </form>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">
              Or use demo account
            </Typography>
            <List>
              {AccountAPI.all().map((user) => (
                <ListItem key={user.id} >
                  <ListItemIcon>
                    {user.user_type === "Doctor" ? (
                      <LocalHospitalIcon />
                    ) : (
                      <AccountBoxIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText >
                    <Link to={calcPath2Board(user)}>
                      {user.user_type}: {user.name}
                    </Link>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Typography variant="body1" color="primary"  align="center">
          v{process.env.REACT_APP_DEMO_VERSION}
        </Typography>
      </Container>
    ); 
}

function calcPath2Board(user) {
  let path = user.user_type === "Doctor" ? "/doctor/" : "/user/";
  path += user.id + "/board";
  console.log("test user:", user, ";  PATH= ", path);
  return path;
}

export default HomePage;
