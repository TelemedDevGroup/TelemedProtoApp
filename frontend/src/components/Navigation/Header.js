import React, {Component} from 'react';
import { Header as HeaderText, Segment, Menu, Dropdown, Container, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {

      return (
        <div>
          <Menu fixed='top' >
            <Container>
              <Menu.Item header>
                <Image size='mini' src='/telemed-logo.png' style={{ marginRight: '1.5em' }} />
                Telemedicine App
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
              <HeaderText as='h3' >
                <Image size='small' circular src='https://img.icons8.com/plasticine/100/000000/user.png' />
                {this.props.authorisedUser.name}
              </HeaderText>
            </Segment>
          </Menu>
        </div>
      )
    }

}

export default Header