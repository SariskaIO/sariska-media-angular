import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-local-stream',
    template: `
                <div>
                    <div *ngFor="let track of newLocalTracks[0] ; index as i">
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
export class LocalStreamComponent implements OnChanges{

    constructor(){}

    @Input() localTracks: any[];
    newLocalTracks: any = [];

    ngOnChanges(changes: SimpleChanges){
      this.newLocalTracks = changes.localTracks.currentValue;

    }

}
