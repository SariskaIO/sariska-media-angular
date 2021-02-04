import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";
import { RemoteStreamService } from 'src/app/services/streams/remoteStream/remoteStream.service';

@Component({
    selector: 'remote-stream',
    template: `
    <div>
            <div *ngFor="let track of remoteTracks ; index as i>
                <ng-container *ngIf="track.isVideoTrack(); then video; else         audio">
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
export class RemoteStreamComponent {
    constructor(){}

    @Input() remoteTracks: any
}