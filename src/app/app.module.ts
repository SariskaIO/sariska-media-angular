import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConnectionComponent} from './components/connection/connection.component';
import { ConstantsService } from './services/constants/constants.service';
import { UtilsService } from './services/utils/utils.service';
import { ConferenceComponent } from './components/conference/conference.component';
import { LocalStreamComponent } from './components/streams/localStream/localStream.component';
import { RemoteStreamComponent } from './components/streams/remoteStream/remoteStream.component';
import { AudioTrackComponent } from './components/players/audioTrack/audioTrack.component';
import { VideoTrackComponent } from './components/players/videoTrack/videoTrack.component';

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
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
