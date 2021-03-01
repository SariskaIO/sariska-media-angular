import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import SariskaMediaTransport from 'sariska-media-transport';
import { ConstantsService } from "src/app/services/constants/constants.service";

@Component({
    selector: 'app-conference',
    template: `
                <div>
                    <app-local-stream [localTracks]="localTracks"></app-local-stream>
                    <app-remote-stream [remoteTracks]="remoteTracks"></app-remote-stream>
                </div>
    `
})
export class ConferenceComponent implements OnChanges, OnDestroy{
    constructor(private constantsService: ConstantsService){}

    @Input() connection: any
    room = null;
    localTracks = [];
    remoteTracks:any = [];
    beforeUnload: Function=()=>{};

    newConn: any = null;

    setLocalTracks = (track) => {
      this.localTracks= [...this.localTracks, track]
    }
    setRemoteTracks = (track) => {
        this.remoteTracks= [...this.remoteTracks, track];
    }

    ngOnChanges(changes: SimpleChanges){
      this.newConn=changes.connection.currentValue;
      SariskaMediaTransport.createLocalTracks({devices:["audio", "video"], resolution: "180"}).
      then(tracks => {
          this.setLocalTracks(tracks);
          this.room && tracks.forEach(track=>this.room.addTrack(track).catch(err =>console.log("track already added")));
      }).
      catch(()=>console.log("failed to fetch tracks"));

      if (!this.connection) {
          return;
      }

      const room = this.connection.initJitsiConference(this.constantsService.conferenceConfig);
       this.beforeUnload=(event)=> {
          if (room && room.isJoined()) {
             room.leave().then(() => this.connection.disconnect(event));
          }
      }

      const onConferenceJoined = ()=> {
          this.room =room;
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

      room.on(SariskaMediaTransport.events.conference.CONFERENCE_JOINED, onConferenceJoined);
      room.on(SariskaMediaTransport.events.conference.TRACK_ADDED, onRemoteTrack);
      room.on(SariskaMediaTransport.events.conference.TRACK_REMOVED, onTrackRemoved);
      room.join();

    }

    ngOnDestroy(){
        this.beforeUnload();
    }

}
