import React, {Component} from 'react';
import Video from 'twilio-video';

class PatientChats extends Component {

    state = {
        activeRoom: null,
        identity: ''
    }

    render() {
        var divStyle = {
            display: 'none'
        }
        return (
            <div>
                <div> Placeholder for Messenger component</div>
                <br/>
                <div>
                    Doctor Jonh Doe
                    <button id="button-join">Video call</button>
                    <button id="button-leave" style={divStyle}>Finish call</button>
                </div>
                <br/>
                <div id="local-media"></div>
                <div id="remote-media"></div>
                <div id="log"></div>
            </div>
        );
    }

    componentDidMount() {
        const chat = this;

        document.getElementById('button-join').onclick = function () {
            fetch("/twilio/token")
                .then(response => response.text())
                .then(token => chat.roomConnect(token))
        }

        document.getElementById('button-leave').onclick = function() {
            chat.log('Leaving room...');
            chat.state.activeRoom.disconnect();
        };
    }

    roomConnect = (token) => {
        let chat = this;
        Video.connect(token, {video: true, audio: true, _useTwilioConnection: true})
            .then(this.roomJoined, function (error) {
                chat.log('Could not connect to Twilio: ' + error.message);
            })
    }

    attachTrack = (track, container) => {
        container.appendChild(track.attach());
    }

    attachTracks = (tracks, container) => {
        let chat = this;
        tracks.forEach(function (track) {
            chat.attachTrack(track, container);
        });
    }

    getTracks = (participant) => {
        return Array.from(participant.tracks.values()).filter(function (publication) {
            return publication.track;
        }).map(function (publication) {
            return publication.track;
        });
    }

    detachTrack = (track) => {
        track.detach().forEach(function (element) {
            element.remove();
        });
    }

    appendName = (identity, container) => {
        const name = document.createElement('p');
        name.id = `participantName-${identity}`;
        name.className = 'instructions';
        name.textContent = identity;
        container.appendChild(name);
    }

    removeName = (participant) => {
        if (participant) {
            let {identity} = participant;
            const container = document.getElementById(`participantContainer-${identity}`);
            container.parentNode.removeChild(container);
        }
    }

    trackPublished = (publication, container) => {
        let chat = this;
        if (publication.isSubscribed) {
            this.attachTrack(publication.track, container);
        }
        publication.on('subscribed', function (track) {
            chat.log('Subscribed to ' + publication.kind + ' track');
            chat.attachTrack(track, container);
        });
        publication.on('unsubscribed', chat.detachTrack);
    }

    trackUnpublished = (publication) => {
        this.log(publication.kind + ' track was unpublished.');
    }

    participantConnected = (participant, container) => {
        let chat = this;
        let selfContainer = document.createElement('div');
        selfContainer.id = `participantContainer-${participant.identity}`;

        container.appendChild(selfContainer);
        this.appendName(participant.identity, selfContainer);

        participant.tracks.forEach(function (publication) {
            chat.trackPublished(publication, selfContainer);
        });
        participant.on('trackPublished', function (publication) {
            chat.trackPublished(publication, selfContainer);
        });
        participant.on('trackUnpublished', this.trackUnpublished);
    }

    detachParticipantTracks = (participant) => {
        var tracks = this.getTracks(participant);
        tracks.forEach(this.detachTrack);
    }

    roomJoined = (room) => {
        let chat = this;

        this.state.activeRoom = room;

        this.log("Joined as '" + this.state.identity + "'");
        document.getElementById('button-join').style.display = 'none';
        document.getElementById('button-leave').style.display = 'block';

        // Attach LocalParticipant's Tracks, if not already attached.
        var previewContainer = document.getElementById('local-media');
        if (!previewContainer.querySelector('video')) {
            this.attachTracks(this.getTracks(room.localParticipant), previewContainer);
        }

        // Attach the Tracks of the Room's Participants.
        var remoteMediaContainer = document.getElementById('remote-media');
        room.participants.forEach(function (participant) {
            chat.log("Already in Room: '" + participant.identity + "'");
            chat.participantConnected(participant, remoteMediaContainer);
        });

        // When a Participant joins the Room, log the event.
        room.on('participantConnected', function (participant) {
            chat.log("Joining: '" + participant.identity + "'");
            chat.participantConnected(participant, remoteMediaContainer);
        });

        // When a Participant leaves the Room, detach its Tracks.
        room.on('participantDisconnected', function (participant) {
            chat.log("RemoteParticipant '" + participant.identity + "' left the room");
            chat.detachParticipantTracks(participant);
            chat.removeName(participant);
        });

        // Once the LocalParticipant leaves the room, detach the Tracks
        // of all Participants, including that of the LocalParticipant.
        room.on('disconnected', function () {
            chat.log('Left');
            chat.detachParticipantTracks(room.localParticipant);
            room.participants.forEach(chat.detachParticipantTracks);
            room.participants.forEach(chat.removeName);
            chat.state.activeRoom = null;
            document.getElementById('button-join').style.display = 'block';
            document.getElementById('button-leave').style.display = 'none';
        });
    }

    log = (message) => {
        var logDiv = document.getElementById('log');
        logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    leaveRoomIfJoined = () => {
        if (this.state.activeRoom) {
            this.state.activeRoom.disconnect();
        }
    }

}

export default PatientChats;
