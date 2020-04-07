import './patient.css';

import React, {Component} from 'react';
import Video from 'twilio-video';

class PatientChats extends Component {

    state = {
        activeRoom: null,
        identity: ''
    }

    render() {
        return (
            <div>
                <div> Placeholder for Messenger component</div>
                <br/>
                <div>
                    Doctor Jonh Doe
                    &nbsp;
                    <button id="button-join">Video call</button>
                    &nbsp;
                    <button id="button-leave" style={{display: 'none'}}>Finish call</button>
                </div>
                <br/>
                <div style={{textAlign: 'center', width: '100%'}} class = 'twilio-participants'>
                    <div id="local-media" style={{display: 'inline-block', width: '45%'}}></div>
                    <div id="remote-media" style={{display: 'inline-block', marginLeft: '50px', width: '45%'}}></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const chat = this;

        document.getElementById('button-join').onclick = function () {
            fetch("/twilio/token")
                .then(response => response.json())
                .then(roomConnection => chat.roomConnect(roomConnection))
        }

        document.getElementById('button-leave').onclick = function () {
            console.log('Leaving room...');
            chat.state.activeRoom.disconnect();
        };

        window.addEventListener('beforeunload', this.leaveRoomIfJoined);
    }

    roomConnect = (roomConnection) => {
        this.state.identity = roomConnection.identity

        Video.connect(roomConnection.token, {video: true, audio: true, _useTwilioConnection: true})
            .then(this.roomJoined, function (error) {
                console.error('Could not connect to Twilio: ' + error.message);
            })
    }

    roomJoined = (room) => {
        const chat = this;

        this.state.activeRoom = room;

        console.info("Joined as '" + this.state.identity + "'");

        document.getElementById('button-join').style.display = 'none';
        document.getElementById('button-leave').style.display = 'inline';

        const previewContainer = document.getElementById('local-media');
        if (!previewContainer.querySelector('video')) {
            this.attachLocalTracks(this.getTracks(room.localParticipant), previewContainer);
        }

        const remoteMediaContainer = document.getElementById('remote-media');
        room.participants.forEach(function (participant) {
            console.info("Already in Room: '" + participant.identity + "'");
            chat.participantConnected(participant, remoteMediaContainer);
        });

        room.on('participantConnected', function (participant) {
            console.info("Joining: '" + participant.identity + "'");
            chat.participantConnected(participant, remoteMediaContainer);
        });

        room.on('participantDisconnected', function (participant) {
            console.info("RemoteParticipant '" + participant.identity + "' left the room");
            chat.detachParticipantTracks(participant);
            chat.removeName(participant);
        });

        room.on('disconnected', function () {
            console.log('Left');

            chat.detachParticipantTracks(room.localParticipant);
            chat.removeName(room.localParticipant);

            room.participants.forEach(chat.detachParticipantTracks);
            room.participants.forEach(chat.removeName);

            chat.state.activeRoom = null;

            document.getElementById('button-join').style.display = 'inline';
            document.getElementById('button-leave').style.display = 'none';
        });
    }

    getTracks = (participant) => {
        return Array.from(participant.tracks.values()).filter(function (publication) {
            return publication.track;
        }).map(function (publication) {
            return publication.track;
        });
    }

    attachLocalTracks = (tracks, container) => {
        const chat = this;

        const selfContainer = document.createElement('div');
        selfContainer.id = `participantContainer-${this.state.identity}`;

        container.appendChild(selfContainer);
        this.appendName(this.state.identity, selfContainer);

        tracks.forEach(function (track) {
            chat.attachTrack(track, selfContainer);
        });
    }

    attachTrack = (track, container) => {
        container.appendChild(track.attach());
    }

    participantConnected = (participant, container) => {
        const chat = this;

        const selfContainer = document.createElement('div');
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
        const chat = this;
        if (publication.isSubscribed) {
            this.attachTrack(publication.track, container);
        }
        publication.on('subscribed', function (track) {
            console.log('Subscribed to ' + publication.kind + ' track');
            chat.attachTrack(track, container);
        });
        publication.on('unsubscribed', chat.detachTrack);
    }

    trackUnpublished = (publication) => {
        console.log(publication.kind + ' track was unpublished.');
    }

    detachParticipantTracks = (participant) => {
        const tracks = this.getTracks(participant);
        tracks.forEach(this.detachTrack);
    }

    leaveRoomIfJoined = () => {
        if (this.state.activeRoom) {
            this.state.activeRoom.disconnect();
        }
    }

}

export default PatientChats;
