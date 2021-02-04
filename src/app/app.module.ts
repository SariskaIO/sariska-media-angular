import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConnectionComponent} from './components/connection/connection.component';
import { ConstantsService } from './services/constants/constants.service';
import { UtilsService } from './services/utils/utils.service';
import { ConnectionService } from './services/connection/connection.service';
import { ConferenceComponent } from './components/conference/conference.component';
import { ConferenceService } from './services/conference/conference.service';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { LocalStreamComponent } from './components/streams/localStream/localStream.component';
import { RemoteStreamComponent } from './components/streams/remoteStream/remoteStream.component';
import { LocalStremService } from './services/streams/localStream/localStream.service';
import { RemoteStreamService } from './services/streams/remoteStream/remoteStream.service';
import { AudioTrackComponent } from './components/players/audioTrack/audioTrack.component';
import { VideoTrackComponent } from './components/players/videoTrack/videoTrack.component';
import { AudioTrackService } from './services/players/audioTrack/audioTrack.service';
import { VideoTrackService } from './services/players/videoTrack/videoTrack.service';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    ConferenceComponent,
    LocalStreamComponent,
    RemoteStreamComponent,
    AudioTrackComponent,
    VideoTrackComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAudioPlayerModule
  ],
  providers: [
                ConstantsService,
                UtilsService,
                ConnectionService,
                ConferenceService,
                LocalStremService,
                RemoteStreamService,
                AudioTrackService,
                VideoTrackService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
