import React, { useState } from "react";
import { Message, Input, Image } from "semantic-ui-react";
import {
  Button,
  Grid,
  Typography,
  List,
  Card,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VideoCallIcon from "@material-ui/icons/VideoCall";

const ChatContainer = ({ chatsData, partner, onClick }) => {
  let [inputData, setInputData] = useState("");
  return (
    <>
      {!chatsData ? (
        <p>Select conversation</p>
      ) : (
        <Grid
          container
          style={{
            position: "relative",
            height: "700px",
          }}
        >
          <Grid container justify="space-between" alignContent="center">
            <Typography variant="h5">{partner}</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<VideoCallIcon>send</VideoCallIcon>}
            >
              Video Call
            </Button>
          </Grid>
          <Grid item xs={12}>
            <List
              style={{
                height: "80%",
                overflowY: "auto",
              }}
            >
              {chatsData.map((message, index) => (
                <Message info={message.partner} size="small" key={index}>
                  <Message.Header>{message.sender}</Message.Header>
                  {message.attachment && (
                    <Image
                      size="medium"
                      style={{ padding: "1.5em" }}
                      src={message.attachment}
                    ></Image>
                  )}
                  {message.message && <p>{message.message}</p>}
                </Message>
              ))}
            </List>
          </Grid>

          <Input
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
            }}
            fluid
            size="large"
            action={{
              color: "teal",
              content: "Send",
              onClick: () => {
                inputData && onClick(inputData);
                setInputData("");
              },
            }}
            placeholder="Input your message..."
          />
        </Grid>
      )}
    </>
  );
};

export default ChatContainer;
