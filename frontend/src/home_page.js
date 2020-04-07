import React, {Component} from 'react';
import './home_page.css';
import { Button, Form, Grid, Header, Image, Segment, Divider, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import AccountAPI from './test_data/test_users.js'

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      default_login: "Aibolit",
    };
  }
  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 650 }}>
            <Header as='h2' color='teal' textAlign='center'>Welcome to Telemedicine Demo &nbsp;&nbsp;
              <Image src='./telemed-logo.png' />
            </Header>
            <Segment placeholder>
              <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                  <Form>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                    />

                    <Button color='teal' fluid size='large'>
                      Login
                  </Button>
                  </Form>
                </Grid.Column>

                <Grid.Column verticalAlign='middle' textAlign='center'>
                  <Header as='h4' color='teal' textAlign='center'>Use Demo account</Header>
                  <List floated='left'>
                  { AccountAPI.all().map( (user, index) => (
                        <List.Item
                          icon={user.user_type === "Doctor" ? "doctor" : "user"}
                          key={user.id}
                          content={ <Link to={calcPasth2Board(user)}> {user.user_type}: {user.name}  </Link> }
                        />
                    ))
                  }
                  </List>
                </Grid.Column>
              </Grid>

              <Divider vertical> Or </Divider>
            </Segment>
            <Header as='h4' color='teal' textAlign='center'>v{process.env.REACT_APP_DEMO_VERSION}  </Header>
          </Grid.Column>
        </Grid>


    );
  }
}

function calcPasth2Board(user) {
  let path = user.user_type === "Doctor" ? "/doctor/" : "/user/";
  path += user.id + "/board";
  console.log("test user:", user, ";  PATH= ", path);
  return path;
}

export default HomePage;
