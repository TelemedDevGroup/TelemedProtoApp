import React, { Component } from "react";
import { Header, Menu, Container, Label, Tab, Icon } from "semantic-ui-react";
import Calendar from "../../components/Calendar/Calendar.js";
import DoctorToDo from "./DoctorToDo.js";
import ChatsGroup from "../../components/Chat/ChatsGroup.js";
import DoctorCalendar from "../../components/Calendar/DoctorCalendar";

const BoardPanes = [
  {
    menuItem: (
      <Menu.Item key="profile">
        <Icon size="large" name="user md" />
        Profile
      </Menu.Item>
    ),
    render: () => <Tab.Pane> Placeholder for Profile component</Tab.Pane>,
  },
  {
    menuItem: (
      <Menu.Item key="todo">
        <Icon size="large" name="clipboard outline" />
        <Label color="teal">{Math.round(Math.random() * 10)}</Label>
        Actions
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane>
        <DoctorToDo />
      </Tab.Pane>
    ),
  },
  {
    menuItem: (
      <Menu.Item key="calendar">
        <Icon size="large" name="calendar alternate outline" />
        Calendar
      </Menu.Item>
    ),
    render: (props) => (
      <Tab.Pane>
        <DoctorCalendar userData={props}/>
      </Tab.Pane>
    ),
  },
  {
    menuItem: (
      <Menu.Item key="chats" position="right">
        <Icon size="large" name="wechat" />
        <Label color="teal">{Math.round(Math.random() * 10)}</Label>
        Messenger
      </Menu.Item>
    ),
    render: (props) => (
      <Tab.Pane>
        <ChatsGroup userData={props}/>
      </Tab.Pane>
    ),
  },
];

class DoctorBoard extends Component {
  state = { activeItem: "ToDo" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const userData = this.props.location.state.currentUser;
    //const user = AccountAPI.get( this.props.match.params.userID );
    //const { activeItem } = this.state
    return (
      <Container style={{ marginTop: "5em" }}>
        <Header as="h3">Welcome to Doctors's Board</Header>
        <Tab
          {...userData}
          panes={BoardPanes}
          menu={{
            fluid: true,
            vertical: true,
            tabular: true,
           activeIndex: 2,
          }}
        />
      </Container>
    );
  }
}

export default DoctorBoard;
