import { Injectable, OnDestroy } from "@angular/core";
import { ConferenceService } from '../../conference/conference.service';
import JitsiMeetJS from 'collabor8-media-transport';

@Injectable()
export class LocalStremService {

    constructor(private conferenceService: ConferenceService) {}

    room = this.conferenceService.room

    tracks=[]

    setTracks(track){
        return this.tracks = track
    }

    getLocakTracks(){
        JitsiMeetJS.createLocalTracks({devices: ['audio', 'video'], resolution: "180"})
            .then(tracks => this.setTracks(tracks))
            .catch(error => console.log(error));
        return () => {
            this.tracks.forEach(item => item.dispose())
        }
    }

    joinRoom(){
        if (this.room && this.room.isJoined()) {
            this.tracks.forEach(item => this.room.addTrack(item))
        }
    }
}