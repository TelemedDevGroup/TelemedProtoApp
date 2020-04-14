import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Icon} from "semantic-ui-react";
import Video from "twilio-video";

const useStyles = makeStyles(() => ({
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: 99
    },

    "modal-main": {
        position: "fixed",
        background: "lightgray",
        width: "720px",
        height: "600px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        textAlign: 'center'
    },

    "display-block": {
        display: "block",
    },

    "display-none": {
        display: "none"
    },

    'close-icon': {
        float: 'right',
        marginTop: '4px'
    },

    media: {
        width: '90%',
        height: '85%',
        margin: '30px auto 0',
        background: 'lightgray'
    },

    'local-media': {
        maxWidth: '200px',
        maxHeight: '400px',
        background: 'gray',
        position: 'absolute',
        right: '40px',
        zIndex: '99'
    },

    'remote-spinner': {
        top: '250px',
        position: 'relative'
    },

    'control-buttons': {
        textAlign: 'center'
    }
}));

const VideoCallModal = ({handleClose, show, token}) => {
    const classes = useStyles();

    let [activeRoom, setActiveRoom] = useState();
    let [showSpinner, setShowSpinner] = useState(true);

    const showHideClassName = show ?
        `${classes.modal} ${classes["display-block"]}` : `${classes.modal} ${classes["display-none"]}`;

    useEffect(() => {
        if (show && !activeRoom) {
            Video.connect(token, {video: true, audio: true, _useTwilioConnection: true})
                .then(room => roomJoined(room), function (error) {
                    console.error('Could not connect to Twilio: ' + error.message);
                });

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
    }

    const attachLocalTracks = (tracks, container) => {
        const selfContainer = document.createElement('div');
        container.appendChild(selfContainer);
        tracks.forEach(function (track) {
            attachTrack(track, selfContainer);
        });
    }

    const attachTrack = (track, container) => {
        container.appendChild(track.attach());
    }

    const getTracks = (participant) => {
        return Array.from(participant.tracks.values()).filter(function (publication) {
            return publication.track;
        }).map(function (publication) {
            return publication.track;
        });
    }

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
    }

    const trackPublished = (publication, container) => {
        if (publication.isSubscribed) {
            attachTrack(publication.track, container);
        }
        publication.on('subscribed', function (track) {
            console.log('Subscribed to ' + publication.kind + ' track');
            attachTrack(track, container);
        });
        publication.on('unsubscribed', detachTrack);
    }

    const detachParticipantTracks = (participant) => {
        const tracks = getTracks(participant);
        tracks.forEach(detachTrack);
        setShowSpinner(true);
    }

    const detachTrack = (track) => {
        track.detach().forEach(function (element) {
            element.remove();
        });
    }

    const trackUnpublished = (publication) => {
        console.log(publication.kind + ' track was unpublished.');
    }

    const finishCall = () => {
        activeRoom.disconnect();
        detachParticipantTracks(activeRoom.localParticipant);

        activeRoom.participants.forEach(detachParticipantTracks);

        setActiveRoom(null);
        handleClose();
    }

    const leaveRoomIfJoined = () => {
        if (activeRoom) {
            activeRoom.disconnect();
        }
    }

    return (
        <div className={showHideClassName}>
            <div className={classes["modal-main"]}>
                <Icon name='close'
                    size={"big"} className={classes["close-icon"]}
                    link onClick={finishCall}/>
                <div className={classes.media}>
                    <div className={classes["local-media"]} id='local-media'/>
                    <div id='remote-media'>
                        {showSpinner && <Icon name='spinner' size='huge' loading
                              className={classes["remote-spinner"]} display="none"/>}
                    </div>
                </div>
                <div className={classes["control-buttons"]}>
                    <Icon name='microphone' size='big' link/>
                    <Icon name='video' size='big' link/>
                    <Icon name='phone square' size='big' color='red' link onClick={finishCall}/>
                </div>
            </div>
        </div>
    );
};

export default VideoCallModal;
