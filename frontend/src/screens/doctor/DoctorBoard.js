import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DoctorToDo from './DoctorToDo'
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import AddLocation from '@material-ui/icons/AddLocation';
import MailIcon from '@material-ui/icons/Mail';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ChatsGroup from '../../components/Chat/ChatsGroup';
import DoctorCalendars from '../../components/Calendar/DoctorCalendars';

const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    paddingTop: '3rem',
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: '6rem 0 0 3rem',
    maxWidth: '70rem',
  },
  header: {
    paddingBottom: "2rem"
  }
});

const menuItems = [
  { title: 'My Board', menuId: 'board', icon: <Home /> },
  { title: 'My Patients', menuId: 'patients', icon: <AddLocation /> },
  { title: 'Visits / Calendar', menuId: 'calendar', icon: <CalendarToday /> },
  { title: 'Conversations', menuId: 'conversation', icon: <MailIcon /> },
  // {title: 'Analytics / Payments', menuId: "analytics" },
  // {title: 'Profile', menuId: "profile" },
];

const switchMenu = (param, props) => {
  switch (param) {
    case 'board':
      return <DoctorToDo />;
    case 'patients':
      return null;
    case 'calendar':
      return  <DoctorCalendars userData={props}/>;
    case 'conversation':
      return <ChatsGroup userData={props} />;
    default:
      return null;
  }
};

const DoctorBoard = (props) => {
  const classes = useStyles();
  const [selectedMenu, setSelectedMenu] = useState({
    title: 'My Board',
    menuId: 'board',
  });
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {menuItems &&
              menuItems.map((item) => (
                <ListItem
                  button
                  key={item.menuId}
                  onClick={() =>
                    setSelectedMenu({ title: item.title, menuId: item.menuId })
                  }
                >
                  <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Typography variant="h4" className={classes.header}>{selectedMenu.title}</Typography>
        {switchMenu(selectedMenu.menuId, props)}
      </main>
    </div>
  );
};

export default DoctorBoard;
