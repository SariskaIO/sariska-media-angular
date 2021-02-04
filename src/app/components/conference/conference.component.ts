import { Component, DoCheck, Input, OnDestroy} from "@angular/core";
import { ConferenceService } from 'src/app/services/conference/conference.service';
import JitsiMeetJS from 'sariska-media-transport';
import { ConstantsService } from "src/app/services/constants/constants.service";

@Component({
    selector: 'conference',
    template: `
                <div>
                    <local-stream [localTracks]="localTracks"></local-stream>
                    <remote-stream [remoteTracks]="remoteTracks"></remote-stream>
                </div>
    `
})
export class ConferenceComponent implements DoCheck, OnDestroy{
    constructor(private constantsService: ConstantsService){}

    @Input() connection: any
    room = null;
    localTracks = [];
    remoteTracks = [];
    setRoom = (val) => {
        this.room = val;
    }
    setLocalTracks = (track) => {
        [...this.localTracks, track]
    }
    setRemoteTracks = (track) => {
        [...this.remoteTracks, track]
    }
    triggerBeforeUnload: Function =null;

    ngDoCheck(){
        JitsiMeetJS.createLocalTracks({devices:["audio", "video"], resolution: "180"}).
        then(tracks => {
            this.setLocalTracks(tracks);
            this.room && tracks.forEach(track=>this.room.addTrack(track).catch(err =>console.log("track already added")));
        }).
        catch(()=>console.log("failed to fetch tracks"));
        
        if (!this.connection) {
            return;
        }

        window.addEventListener('beforeunload', beforeUnload);
        const room = this.connection.initJitsiConference(this.constantsService.conferenceConfig);

        function beforeUnload(event) {
            if (room && room.isJoined()) {
                this.triggerBeforeUnload= room.leave().then(() => this.connection.disconnect(event));
            }
        }

        const onConferenceJoined = ()=> {
            this.setRoom(room);
        }

        const onTrackRemoved = (track)=> {
            this.setRemoteTracks(this.remoteTracks.filter(item => item.track.id !== track.track.id));
        }
   
        const onRemoteTrack = (track)=> {
            if (!track  || track.isLocal()) {
                return;
            }
            this.setRemoteTracks(track);
        }

        room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
        room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
        room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, onTrackRemoved);
        room.join();
    }

    ngOnDestroy(){
        this.triggerBeforeUnload();
    }

}
