import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";
import { Header, Segment, Menu, Dropdown, Container, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DoctorBoard from './../doctor/DoctorBoard.js'
import PatientBoard from './../patient/PatientBoard.js'
import PageNotFound from './PageNotFound.js'
import AccountAPI from './../test_data/test_users.js'


class DemoMainLayout extends Component {
  render() {
    const user = AccountAPI.get( this.props.match.params.userID );
    if (!user) {
      return <PageNotFound/>
    }
    return (
      <React.Fragment>
        <HeaderMenu authorisedUser={user} />
        <br/>
        <Switch>
          <Route path="/user/:userID/board" component={PatientBoard} />
          <Route path="/doctor/:userID/board" component={DoctorBoard} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      </React.Fragment>
    );
  }

}

class HeaderMenu extends Component {
    render() {

      return (
        <div width='100%'>
          <Menu fixed='top' >
            <Container>
              <Menu.Item header>
                <Image size='mini' src='/logo_small.png' style={{ marginRight: '1.5em' }} />
                Telemedicine Demo
              </Menu.Item>
              <Menu.Item > <Link to='/'>Home</Link> </Menu.Item>

              <Dropdown item simple text='Help'>
                <Dropdown.Menu>
                  <Dropdown.Item><a className='text' href="https://www.itechart.com/our-works/">iTechArt</a></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Reused components</Dropdown.Header>
                  <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>Components</span>
                    <Dropdown.Menu>
                      <Dropdown.Item><a href="https://ej2.syncfusion.com/react/documentation/schedule/getting-started/">React Calendar component</a></Dropdown.Item>
                      <Dropdown.Item><a href="https://github.com/nguymin4/react-videocall">React videocall component</a></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Container>
            <Segment vertical floated='left'>
              <Header as='h3' >
                <Image size='small' circular src='https://img.icons8.com/plasticine/100/000000/user.png' />
                {this.props.authorisedUser.name}
              </Header>
            </Segment>
          </Menu>
        </div>
      )
    }

}

export default DemoMainLayout;
