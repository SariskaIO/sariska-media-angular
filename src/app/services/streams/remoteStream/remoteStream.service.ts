import { Injectable } from "@angular/core";
import { ConferenceService } from '../../conference/conference.service';
import JitsiMeetJS from 'collabor8-media-transport';

@Injectable()
export class RemoteStreamService {
    constructor(private conferenceService: ConferenceService){}

    room = this.conferenceService.room

    remoteTracks={}

    setRemoteTracks(track) {
        return this.remoteTracks = track
    }
    
    createRoom(){
        if ( !this.room ) {
            return;
        }
        this.room.on(JitsiMeetJS.events.conference.USER_JOINED, onUserJoined);
        this.room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
        this.room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
        this.room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, onTrackRemoved);

        function onTrackRemoved(track) {
           console.log('track removed!!!!');
        }

        function onUserJoined(id) { //notifies the local user that he joined the conference successfully.
            console.log(`user joined!!! ${id}`);
            this.remoteTracks[id] = [];
        }

        function onRemoteTrack(track) {
            if (!track  || track.isLocal()) {
                return;
            }
            const id = track.getParticipantId();
            this.remoteTracks[id] = this.remoteTracks[id] || [];
            this.remoteTracks[id].push(track);
            this.setRemoteTracks({...this.remoteTracks});
        }

        function onUserLeft(id) {
            delete this.remoteTracks[id];
            console.log('user left!!!', id)
            this.setRemoteTracks({...this.remoteTracks});
        }

    }

}