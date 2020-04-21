import {Container, Grid, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';

import {getAllRooms, getRoom, poll, sendMessageRoom} from '../../services/ChatRequests';
import ChatContainer from './ChatContainer.js';

const useStyles = makeStyles({
  chatsList: {
    height: '700px',
    background: '#F2FBFB'
  },
  selected: {
    background: '#00B5AD',
    '&:hover': {
      background: '#00B5AD'
    },
  },
});

const Conversation = ({ participants, onClick, selected, lastMessage }) => {
  const classes = useStyles();
  const names = participants && participants.map(user => user.username).join(", ")
  return (
      <ListItem
          button
          onClick={() => onClick()}
          className={`${selected && classes.selected}`}
      >
        <ListItemText primary={names} secondary={lastMessage}/>
      </ListItem>
  );
};

const pollingState = {
  pollingActive: false,
  pollingRunning: false
};

const ChatsGroup = ({userData}) => {
  const [allRooms, setAllRooms] = useState([]);
  const [selectedDialog, setSelDialog] = useState([]);
  const [selRoomId, setSelRoomId] = useState({id: null, participants: null});

  useEffect(() => {
    getAllRooms().then((response) => {
      setAllRooms(response.content);
      pollingState.pollingActive = true;
      if (!pollingState.pollingRunning) {
        pollNext(response.content);
      }
    });

    return function stopPolling() {
      pollingState.pollingActive = false;
    };
  }, []);

  const pollNext = (oldRooms) => {
    if (!pollingState.pollingActive) return;
    pollingState.pollingRunning = true;
    poll().then(rooms => {
      pollingState.pollingRunning = false;
      if (!pollingState.pollingActive) return;

      const newRoomState = [];
      rooms.forEach(function (room) {
        // update current room messages if its opened
        if (room.id === selRoomId.id) {
          setSelDialog([...selectedDialog, room.messages]); // insert new message
        }

        newRoomState.push(room);
      });

      // copy old rooms to the new state excluding just updated
      oldRooms.filter(room => !newRoomState.some(item => item.id === room.id))
          .forEach(room => newRoomState.push(room));

      setAllRooms(newRoomState);

      // here possible to show notification
      // todo: refactor this to dispatched events, possible call stack exceeded exception?
      pollNext(newRoomState);
    });
  };

  const clickHandler = (id, participants) => {
    setSelRoomId({id, participants});

    getRoom(id).then((response) => setSelDialog(response.content.reverse()));
  };

  const sendMessage = (message) => {
    sendMessageRoom({
      room: selRoomId.id,
      type: 'TEXT',
      source: 'USER',
      body: message
    })/*.then((response) => setSelDialog([...selectedDialog, response]))*/;
  };

  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h5">Your conversations</Typography>
      <Grid container>
        <Grid className={classes.chatsList} item xs={4}>
          {!allRooms.length ? (
            <p>No conversations found</p>
          ) : (
            <List>
              {allRooms &&
                allRooms.map((room) => (
                  <Conversation
                      onClick={() =>
                      clickHandler(room.id, room.participants)
                    }
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
          <ChatContainer
            participants={selRoomId.participants}
            currentUser={userData.id}
            chatsData={selectedDialog}
            onClick={sendMessage}
          ></ChatContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatsGroup;
