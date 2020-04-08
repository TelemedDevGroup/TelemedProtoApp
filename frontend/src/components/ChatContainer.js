import React, { useState } from "react";
import {
  List,
  Message,
  Input,
  Grid,
  Header,
  Button,
  Image,
} from "semantic-ui-react";

const ChatContainer = ({ chatsData, partner, onClick }) => {
  let [inputData, setInputData] = useState("");
  return (
    <>
      {!chatsData ? (
        <p>Select conversation</p>
      ) : (
        <Grid.Row
          style={{
            position: "relative",
            height: "700px",
          }}
        >
          <Grid
            columns={2}
            verticalAlign="middle"
            relaxed="very"
            padded="vertically"
          >
            <Grid.Column>
              <Header as="h3">{partner}</Header>
            </Grid.Column>
            <Grid.Column>
              <Button
                floated="right"
                content="Video Call"
                icon="video"
                labelPosition="left"
                color="teal"
              ></Button>
            </Grid.Column>
          </Grid>
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
        </Grid.Row>
      )}
    </>
  );
};

export default ChatContainer;
