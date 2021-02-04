import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";
import { LocalStremService } from 'src/app/services/streams/localStream/localStream.service';

@Component({
    selector: 'local-stream',
    template: `
                <div>
                    <div *ngFor="let track of localTracks ; index as i>
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
export class LocalStreamComponent {
    
    constructor(){}

    @Input() localTracks: any

}