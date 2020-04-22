import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import {
  getAllRooms,
  getRoom,
  poll,
  sendMessageRoom,
} from '../../services/ChatRequests';
import ChatContainer from './ChatContainer.js';

const useStyles = makeStyles({
  chatsList: {
    minHeight: '760px',
    background: '#CCF0EF',
    margin: '-2rem',
    paddingTop: '2rem',
  },

  conversation: {
    paddingLeft: '3rem',
  },
  selected: {
    background: '#00B5AD',
    color: 'white',
    '&:hover': {
      background: '#00B5AD',
    },
  },
});

const Conversation = ({ participants, onClick, selected, lastMessage }) => {
  const classes = useStyles();
  const names =
    participants && participants.map((user) => user.username).join(', ');
  return (
    <ListItem
      button
      onClick={() => onClick()}
      className={`${selected && classes.selected} ` + classes.conversation}
    >
      <ListItemIcon>
        <Avatar src="/chatImages/user.svg" />
      </ListItemIcon>
      <ListItemText primary={names} secondary={lastMessage} />
    </ListItem>
  );
};

const pollingState = {
  pollingActive: false,
  pollingRunning: false,
  selDialogMessages: [],
  rooms: [],
  roomId: null,
};

const ChatsGroup = ({ userData }) => {
  const [allRooms, setAllRooms] = useState([]);
  const [selectedDialog, setSelDialog] = useState([]);
  const [selRoomId, setSelRoomId] = useState({ id: null, participants: null });

  const userId = userData.location
    ? userData.location.state.currentUser.id
    : userData.currentUser.id;

  useEffect(() => {
    getAllRooms().then((response) => {
      setAllRooms(response.content);
      pollingState.rooms = response.content;
      pollingState.pollingActive = true;
      if (!pollingState.pollingRunning) {
        pollNext();
      }
    });

    return function stopPolling() {
      pollingState.pollingActive = false;
    };
  }, []);

  const pollNext = () => {
    if (!pollingState.pollingActive) return;
    pollingState.pollingRunning = true;
    poll().then((rooms) => {
      pollingState.pollingRunning = false;
      if (!pollingState.pollingActive) return;

      const newRoomState = [];
      rooms.forEach(function (room) {
        // update current room messages if its opened
        if (room.id === pollingState.roomId) {
          pollingState.selDialogMessages = [
            ...pollingState.selDialogMessages,
            ...room.messages,
          ];
          setSelDialog([...pollingState.selDialogMessages]); // insert new message
        }

        newRoomState.push(room);
      });

      // copy old rooms to the new state excluding just updated
      pollingState.rooms
        .filter((room) => !newRoomState.some((item) => item.id === room.id))
        .forEach((room) => newRoomState.push(room));

      setAllRooms(newRoomState);
      pollingState.rooms = newRoomState;

      // here possible to show notification
      // todo: refactor this to dispatched events, possible call stack exceeded exception?
      pollNext();
    });
  };

  const clickHandler = (id, participants) => {
    setSelRoomId({ id, participants });
    pollingState.roomId = id;

    getRoom(id).then((response) => {
      const messages = response.content.reverse();
      pollingState.selDialogMessages = messages;
      setSelDialog(messages);
    });
  };

  const sendMessage = (message) => {
    sendMessageRoom({
      room: selRoomId.id,
      type: 'TEXT',
      source: 'USER',
      body: message,
    }).then((response) => console.log('Message sent:', response));
  };

  const classes = useStyles();
  return (
    <div>
      <Grid container justify="space-between">
        <Grid className={classes.chatsList} item xs={4}>
          <Typography variant="h5" style={{ paddingLeft: '3rem' }}>
            Recent chats
          </Typography>
          {!allRooms.length ? (
            <p>No conversations found</p>
          ) : (
            <List>
              {allRooms &&
                allRooms.map((room) => (
                  <Conversation
                    onClick={() => clickHandler(room.id, room.participants)}
                    selected={room.id === selRoomId.id}
                    participants={room.participants}
                    lastMessage={room.lastMessage}
                    key={room.id}
                  ></Conversation>
                ))}
            </List>
          )}
        </Grid>
        <Grid item xs={8}>
          {!selectedDialog.length ? (
            <Typography variant="h5" align="center" style={{paddingTop: "50%"}}>
              Select conversation
            </Typography>
          ) : (
            <ChatContainer
              participants={selRoomId.participants}
              currentUser={userId}
              chatsData={selectedDialog}
              onClick={sendMessage}
            ></ChatContainer>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatsGroup;
