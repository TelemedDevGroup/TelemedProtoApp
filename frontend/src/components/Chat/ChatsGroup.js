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
import AccountAPI from "../../mocks/test_conversations.js";
import ChatContainer from "./ChatContainer.js";

import { getAllRooms, getRoom, sendMessageRoom } from "../../services/ChatRequests";

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

const Conversation = ({ doctorName, onClick, selected, lastMessage }) => {
  const classes = useStyles();
  return (
    <ListItem
      button
      onClick={() => onClick()}
      className={`${selected && classes.selected}`}     
    >
      <ListItemText
        primary={doctorName}
        secondary={lastMessage}
      />
    </ListItem>
  );
};

const ChatsGroup = () => {
  let [userDialogs, setUserDialog] = useState([]);
  let [allRooms, setAllRooms] = useState([]);
  let [selectedDialog, setSelDialog] = useState([]);
  let [selRoomId, setSelRoomId] = useState({id: null , participants: ''});

  useEffect(() => {
    setUserDialog(AccountAPI.get("P001"));
    getAllRooms().then((response) => setAllRooms(response.content));
  }, []);

  const userRooms =
    allRooms.length &&
    allRooms.filter((room) => room.participants.some((partId) => partId === 1));

  const clickHandler = (id, participants) => {
    setSelRoomId({id, participants});
    getRoom(id).then((response) => setSelDialog(response.content.reverse()));
  };

  const sendMessage = (message) => {
   
    sendMessageRoom({
      room: selRoomId.id,
      type: "TEXT",
      source: "USER",
      author: 1,
      body: message,
    }).then(response => (  setSelDialog([
      ...selectedDialog,
      response,
    ])))
  };
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h5">Your conversations</Typography>
      <Grid container>
        <Grid className={classes.chatsList} item xs={4}>
          {!userDialogs.length ? (
            <p>No conversations found</p>
          ) : (
            <List>
              {userRooms &&
                userRooms.map((room) => (
                  <Conversation
                    onClick={() => clickHandler(room.id, room.participants.join(","))}
                    selected={room.id === selRoomId.id}
                    doctorName={room.participants.join(",")}
                    lastMessage="test"
                    key={room.id}
                  ></Conversation>
                ))}
            </List>
          )}
        </Grid>
        <Grid item xs={8}>
          <ChatContainer
            partner={selRoomId.participants}
            currentUser={1}
            chatsData={selectedDialog}
            onClick={sendMessage}
          ></ChatContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatsGroup;
