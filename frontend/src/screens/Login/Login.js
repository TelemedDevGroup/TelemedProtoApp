import React, {Component} from "react";
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
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { Link as RouterLink, Redirect } from "react-router-dom";
import AccountAPI from "../../mocks/test_users.js";
import { ACCESS_TOKEN } from '../../constants';
import { getCurrentUser, login } from '../../services/Auth';

const styles = {
  button: {
    background: '#00B5AD',
  },

  mainHeader: {
    marginTop: "10rem",
    color: "#00B5AD"
  },

  secondHeader : {
    margin: "5rem 0 1rem 0"
  },

  version: {
    marginTop: '2rem',
    fontSize: "16px",
    color: "#00B5AD"
  },

  demoUserItem: {
    cursor: 'pointer',
  },
}

function calcPath2Board(user) {
  let path = user.user_type === "Doctor" ? "/doctor" : "/user";
  path += "/board";
  console.log("test user:", user, ";  PATH= ", path);
  return path;
}

function ListItemLink(props) {
  const {to, primary, icon, id, parentProps } = props;

  function handleDemoAccountLogin(event, userId) {
    const user = AccountAPI.get(userId);
    const loginRequest = Object.assign({}, {email: user.login, password: user.pswd});

    login(loginRequest)
    .then(response => {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      console.log("You're successfully logged in!");
      const pathname = response.user.roles[0].name === "DOCTOR" ? "/doctor" : "/user";

      parentProps.history.push({
        pathname: pathname + '/board',
        state: { currentUser: response.user }
      });
    }).catch(error => {
      console.log((error && error.message) || 'Oops! Something went wrong. Please try again!');
    });
  }

  return (
    <li style={styles.demoUserItem}>
      <ListItem
        onClick={((e) => handleDemoAccountLogin(e, id))}>
        <ListItemIcon>
          {props.icon === "Doctor" ? <LocalHospitalIcon /> : <AccountBoxIcon />}
        </ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
      });
    }).catch(error => {
      console.log('Error during getting of current user.');
    });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    console.log("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {

    return (
      <Container component="main" maxWidth="sm">
        <Grid container style={styles.mainHeader}>
          <Typography variant="h4"  align="center">
            Welcome to Telemedicine Demo &nbsp;&nbsp;
          </Typography>
          <Avatar src="./telemed-logo.png" />
        </Grid>
        <Grid container justify="center" spacing={10}>
          <Grid item xs={6}>
            <Typography variant="h6" style={styles.secondHeader}>Sign In</Typography>
            <LoginContainer  {...this.props} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6"  style={styles.secondHeader}>Or use demo account</Typography>
            <List>
              {AccountAPI.all().map((user) => (
                <ListItemLink
                  to={calcPath2Board(user)}
                  primary={user.user_type + " " + user.name}
                  icon={user.user_type}
                  id={user.id}
                  parentProps={this.props}
                />
            ))}
            </List>
          </Grid>
        </Grid>

        <Typography variant="body1" style={styles.version} align="center">
          v{process.env.REACT_APP_DEMO_VERSION}
        </Typography>
      </Container>
    );
  }
};

class LoginContainer extends Component {
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
      if(this.props.authenticated) {

        const currentUser = this.props.currentUser;
        const pathname = currentUser.roles[0].name === "DOCTOR" ? "/doctor" : "/user";

            return <Redirect
                to={{
                pathname: pathname + "/board",
                state: { from: this.props.location }
            }}/>;
        }

        return (
            <div>
              <LoginForm {...this.props} />
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            console.log("You're successfully logged in!");
            const pathname = response.user.roles[0].name === "DOCTOR" ? "/doctor" : "/user";

            this.props.history.push({
              pathname: pathname + '/board',
              state: { currentUser: response.user }
            })
        }).catch(error => {
            alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
            console.log((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
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
                value={this.state.password}
                onChange={this.handleInputChange}
              />

              <Button
                style={styles.button}
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </form>
        );
    }
}

export default Login;
