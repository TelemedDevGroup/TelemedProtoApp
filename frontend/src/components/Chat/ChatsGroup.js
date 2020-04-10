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
      className={selected && classes.selected}
    >
      <ListItemText
        primary={doctorName}
        secondary={lastMessage[lastMessage.length - 1].message}
      />
    </ListItem>
  );
};

const ChatsGroup = () => {
  let [userDialogs, setUserDialog] = useState([]);
  let [allRooms, setAllRooms] = useState([]);
  let [selectedDialog, setSelDialog] = useState([]);

  useEffect(() => {
    setUserDialog(AccountAPI.get("P001"));
    getAllRooms().then((response) => setAllRooms(response.content));
  }, []);

  const userRooms =
    allRooms.length &&
    allRooms.filter((room) => room.participants.some((partId) => partId === 1));

  const clickHandler = (id) => {
    getRoom(id).then((response) => setSelDialog(response.content));
  };

  const sendMessage = (message) => {
    const newMessage = { sender: userDialogs[0].userName, message: message };
    
    sendMessageRoom({
      room: selectedDialog[0].id,
      type: "TEXT",
      source: "USER",
      author: 1,
      body: message,
    });
    // setSelDialog({
    //   ...selectedDialog,
    //   ...selectedDialog.dialog.push(newMessage),
    // });
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
                    onClick={() => clickHandler(room.id)}
                    selected={room.id === selectedDialog.id}
                    doctorName="test"
                    lastMessage="test"
                    key={room.id}
                  ></Conversation>
                ))}
            </List>
          )}
        </Grid>
        <Grid item xs={8}>
          <ChatContainer
            // partner={selectedDialog.doctorName}
            chatsData={selectedDialog}
            onClick={sendMessage}
          ></ChatContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatsGroup;
