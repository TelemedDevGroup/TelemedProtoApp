import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatContainer from "./ChatContainer.js";

import {
  getAllRooms,
  getRoom,
  sendMessageRoom,
} from "../../services/ChatRequests";

const useStyles = makeStyles({
  chatsList: {
    height: "700px",
    background: "#F2FBFB",
  },
  selected: {
    background: "#00B5AD",
    "&:hover": {
      background: "#00B5AD",
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
      <ListItemText primary={names} secondary={lastMessage} />
    </ListItem>
  );
};

const ChatsGroup = ({ userData }) => {
  const [allRooms, setAllRooms] = useState([]);
  const [selectedDialog, setSelDialog] = useState([]);
  const [selRoomId, setSelRoomId] = useState({ id: null, participants: null });

  useEffect(() => {
    getAllRooms().then((response) => setAllRooms(response.content));
  }, []);

  const clickHandler = (id, participants) => {    
    setSelRoomId({ id, participants });
    
    getRoom(id).then((response) => setSelDialog(response.content.reverse()));
  };

  const sendMessage = (message) => {
    sendMessageRoom({
      room: selRoomId.id,
      type: "TEXT",
      source: "USER",
      body: message,
    }).then((response) => setSelDialog([...selectedDialog, response]));
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
                    lastMessage="test"
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
