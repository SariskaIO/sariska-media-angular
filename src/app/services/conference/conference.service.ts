import { Injectable } from "@angular/core";
import { ConnectionService } from '../connection/connection.service';
import { ConstantsService } from '../constants/constants.service';
import JitsiMeetJS from 'collabor8-media-transport';

@Injectable()
export class ConferenceService {
    constructor(private connectionService: ConnectionService, private constantsServie: ConstantsService){}

    room= null
    connection = this.connectionService.connection

    setRoom(newRoom){
        return this.room = newRoom
    }
    

    createRoom(){
        if (!this.connection) {
            return;
        }

        window.addEventListener('beforeunload', beforeUnload)
        const room = this.connection.initJitsiConference(this.constantsServie.conferenceConfig);
        room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        room.join();

        function onConferenceJoined() {
            this.setRoom(room)
        }

        function beforeUnload(event) {
           room.leave().then(() => this.connection.disconnect(event));
        }
        
        return ()=> {
           room.leave().then(() => this.connection.disconnect());
        }
    }
}