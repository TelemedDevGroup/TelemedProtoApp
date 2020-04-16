import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from 'semantic-ui-react';
import Video from 'twilio-video';
import { Card } from '@material-ui/core';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: 99,
  },

  modalMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'lightgray',
    width: '720px',
    height: '600px',
    padding: '0.5rem',
  },

  'close-icon': {
    alignSelf: 'flex-end',
    paddingTop: '0.5rem',
  },

  media: {
    margin: '30px 10px 10px',
    background: 'lightgray',
    position: 'relative',
  },

  localMedia: {
    width: '100%',
  },

  'remote-spinner': {
    top: '250px',
    position: 'relative',
  },

  controlButtons: {
    width: '4rem  !important',
    height: '4rem !important',
    fontSize: '2.2rem !important',
    background: 'gray',
    color: 'white',
    borderRadius: '12px',
    paddingTop: '1rem',
  },

  buttonsContainer: {
    display: 'flex',
    width: '15rem',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },

  remoteVideoContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    position: 'absolute',
    overflowX: 'auto',
    top: 0,
  },

  remoteVideo: {
    maxWidth: '25%',
  },
});

const VideoCallModal = ({ handleClose, show, token }) => {
  const classes = useStyles();

  let [activeRoom, setActiveRoom] = useState();
  let [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    if (show && !activeRoom) {
      Video.connect(token, {
        video: false,
        audio: false,
        _useTwilioConnection: true,
      }).then(
        (room) => roomJoined(room),
        function (error) {
          console.error('Could not connect to Twilio: ' + error.message);
        }
      );

      window.addEventListener('beforeunload', leaveRoomIfJoined);
    }
  });

  const roomJoined = (room) => {
    setActiveRoom(room);
    const previewContainer = document.getElementById('local-media');
    if (!previewContainer.querySelector('video')) {
      attachLocalTracks(getTracks(room.localParticipant), previewContainer);
    }

    const remoteMediaContainer = document.getElementById('remote-media');
    room.participants.forEach(function (participant) {
      participantConnected(participant, remoteMediaContainer);
    });

    room.on('participantConnected', function (participant) {
      participantConnected(participant, remoteMediaContainer);
    });

    room.on('participantDisconnected', function (participant) {
      detachParticipantTracks(participant);
    });

    room.on('disconnected', function () {
      detachParticipantTracks(room.localParticipant);

      room.participants.forEach(detachParticipantTracks);

      setActiveRoom(null);
    });
  };

  const attachLocalTracks = (tracks, container) => {
    const selfContainer = document.createElement('div');
    container.appendChild(selfContainer);
    tracks.forEach(function (track) {
      attachTrack(track, selfContainer);
    });
  };

  const attachTrack = (track, container) => {
    container.appendChild(track.attach());
  };

  const getTracks = (participant) => {
    return Array.from(participant.tracks.values())
      .filter(function (publication) {
        return publication.track;
      })
      .map(function (publication) {
        return publication.track;
      });
  };

  const participantConnected = (participant, container) => {
    const selfContainer = document.createElement('div');
    container.appendChild(selfContainer);

    participant.tracks.forEach(function (publication) {
      trackPublished(publication, selfContainer);
    });

    participant.on('trackPublished', function (publication) {
      trackPublished(publication, selfContainer);
    });

    setShowSpinner(false);

    participant.on('trackUnpublished', trackUnpublished);
  };

  const trackPublished = (publication, container) => {
    if (publication.isSubscribed) {
      attachTrack(publication.track, container);
    }
    publication.on('subscribed', function (track) {
      console.log('Subscribed to ' + publication.kind + ' track');
      attachTrack(track, container);
    });
    publication.on('unsubscribed', detachTrack);
  };

  const detachParticipantTracks = (participant) => {
    const tracks = getTracks(participant);
    tracks.forEach(detachTrack);
    setShowSpinner(true);
  };

  const detachTrack = (track) => {
    track.detach().forEach(function (element) {
      element.remove();
    });
  };

  const trackUnpublished = (publication) => {
    console.log(publication.kind + ' track was unpublished.');
  };

  const finishCall = () => {
    if (!activeRoom) {
      setActiveRoom(null);
      handleClose();
      return null;
    }

    activeRoom.disconnect();
    detachParticipantTracks(activeRoom.localParticipant);

    activeRoom.participants.forEach(detachParticipantTracks);
    setActiveRoom(null);
    handleClose();
  };

  const leaveRoomIfJoined = () => {
    if (activeRoom) {
      activeRoom.disconnect();
    }
  };

  return (
    <div className={classes.modal}>
      <Card className={classes.modalMain}>
        <Icon
          name="close"
          size="big"
          className={classes['close-icon']}
          link
          onClick={finishCall}
        />
        <div className={classes.media}>
          <div className={classes.localMedia} id="local-media">
            {/* {showSpinner ? (
              <Icon
                name="spinner"
                size="huge"
                loading
                autoPlay
                className={classes["remote-spinner"]}
                display="none"
              />
            ) : ( */}
            <video
              src="/chatVideo/localVideo.mp4"
              autoPlay
              style={{ maxWidth: '100%' }}
            ></video>
            {/* )} */}
          </div>
          <div id="remote-media" className={classes.remoteVideoContainer}>
            <video
              className={classes.remoteVideo}
              src="/chatVideo/partnerVideo.mp4"
              autoPlay
              muted
            ></video>
            <video
              className={classes.remoteVideo}
              src="/chatVideo/partnerVideo.mp4"
              autoPlay
              muted
            ></video>
            <video
              className={classes.remoteVideo}
              src="/chatVideo/partnerVideo.mp4"
              autoPlay
              muted
            ></video>
          </div>
        </div>
        <div className={classes.buttonsContainer}>
          <Icon
            className={classes.controlButtons}
            name="microphone"
            size="big"
            link
          />
          <Icon
            className={classes.controlButtons}
            name="video"
            size="big"
            link
          />
          <Icon
            className={classes.controlButtons}
            style={{ background: 'red' }}
            name="phone square"
            size="big"
            link
            onClick={finishCall}
          />
        </div>
      </Card>
    </div>
  );
};

export default VideoCallModal;
