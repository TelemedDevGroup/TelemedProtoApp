import React, {useEffect, useRef, useState} from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import VideoCallModal from './VideoCallModal';
import { createVideoRoom } from '../../services/ChatRequests';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    height: '700px',
  },
  message: {
    border: '1px solid gray',
    background: 'WhiteSmoke',
    padding: '0.8rem',
    marginTop: '1rem',
    borderRadius: '8px',
    width: '48%',
  },
  senderName: {
    fontSize: '1.2rem',
  },
  partner: {
    border: '1px solid #00B5AD',
    background: '#F2FBFB',
    alignSelf: 'flex-end',
  },

  image: {
    padding: '1rem 0',
    width: '100%',
  },

  videoButton: {
    background: '#00B5AD',
    color: 'white',
    height: '40px',
    '&:hover': {
      background: '#00B5AD',
    },
  },

  sendButton: {
    background: '#00B5AD',
    color: 'white',
    minWidth: '7rem',
    height: '3.85rem',
    borderRadius: '0 4px 4px 0',
    '&:hover': {
      background: '#00B5AD',
    },
  },

  dialogHeader: {
    padding: '0 0 1rem 2rem',
    borderBottom: '1px solid lightgray',
  },
});

const ChatContainer = ({ chatsData, participants, currentUser, onClick, markRoomAsRead }) => {
  let [activeVideoCall, setActiveVideoCall] = useState(false);
  let [inputData, setInputData] = useState('');
  let [token, setToken] = useState('');
  const classes = useStyles();

  let dialogContainer = useRef(null);

  const startVideoCall = (token) => {
    setToken(token);
    setActiveVideoCall(true);
  };

  const finishVideoCall = () => {
    setToken(null);
    setActiveVideoCall(false);
  };

  const getNameById = (userId) => {
    const getUser =
      participants && participants.find((partner) => partner.userId === userId);
    return getUser && getUser.username;
  };

  const scrollToBottom = () => {
    dialogContainer.current && dialogContainer.current.scrollTo(0, dialogContainer.current.scrollHeight);
    chatsData && chatsData.length && markRoomAsRead(chatsData[chatsData.length -1].room);
  }

  useEffect(() => {
    scrollToBottom();
  }, [chatsData]);

  return (
    <>
      {!chatsData ? (
        <p>No data found</p>
      ) : (
        <Grid
          className={classes.container}
          container
        >
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.dialogHeader}
          >
            <Typography variant="h5">
              {participants &&
                participants.map((user) => user.username).join(', ')}
            </Typography>
            <Button
              variant="contained"
              className={classes.videoButton}
              startIcon={<VideoCallIcon>send</VideoCallIcon>}
              onClick={() => {
                createVideoRoom(
                  '0b3a56ce-a7dc-4cff-9588-697db5ff6fe4'
                ).then((json) => startVideoCall(json.token));
              }}
            >
              Video Call
            </Button>
            {activeVideoCall && (
              <VideoCallModal
                handleClose={finishVideoCall}
                show={activeVideoCall}
                token={token}
              />
            )}
          </Grid>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            style={{
              height: '80%',
              overflowY: 'auto',
            }}
            ref={dialogContainer}
          >
            {chatsData &&
              chatsData.map((message, index) => (
                <Grid
                  key={index}
                  className={`${classes.message} ${
                    currentUser === message.author && classes.partner
                  }`}
                >
                  <Typography className={classes.senderName} variant="h6">
                    {getNameById(message.author)}
                  </Typography>
                  {message.attachment && (
                    <img
                      className={classes.image}
                      src={message.attachment}
                      alt="attachment"
                    ></img>
                  )}

                  {message.body && (
                    <Typography variant="body1">{message.body}</Typography>
                  )}
                </Grid>
              ))}
          </Grid>

          <Grid container direction="row" alignContent="center" wrap="nowrap">
            <TextField
              fullWidth
              id="message_input"
              variant="outlined"
              placeholder="Input your message..."
              value={inputData}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  inputData && onClick(inputData);
                  setInputData('');
                }
              }}
              onChange={(event) => setInputData(event.target.value)}
            ></TextField>
            <Button
              className={classes.sendButton}
              onClick={() => {
                inputData && onClick(inputData);
                setInputData('');
              }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ChatContainer;
