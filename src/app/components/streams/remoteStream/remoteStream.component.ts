import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-remote-stream',
    template: `
    <div>
            <div *ngFor="let track of newRemoteTracks[0] ; index as i">
                <ng-container *ngIf="track.isVideoTrack(); then video; else audio">
                </ng-container>
                <ng-template #video>
                    <video-track [key]="i" [track]="track"></video-track>
                </ng-template>
                <ng-template #audio>
                    <audio-track [key]="i" [track]="track"></audio-track>
                </ng-template>
            </div>
        </div>
            `
        })
export class RemoteStreamComponent implements OnChanges {
    constructor(){}

    @Input() remoteTracks: any;
    newRemoteTracks: any;

    ngOnChanges(changes: SimpleChanges){
      this.newRemoteTracks = changes.remoteTracks.currentValue;

    }
}
