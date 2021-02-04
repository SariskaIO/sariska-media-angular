
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";


@Component({
    selector: 'video-track',
    template: `
                <video controls #videoOption>
                    <source src="track" type="video/mp4" autoplay="true">
                </video>
    `
})
export class VideoTrackComponent implements AfterViewInit, OnDestroy {
    constructor(){}

    @Input() track: any;
    newTrack: any;

    setNewTrack = ( track) => {
        this.newTrack=track;
    }

    @ViewChild('videoOption') videoPlayerRef: ElementRef;


    ngAfterViewInit(){
        const element = this.videoPlayerRef.nativeElement;
        this.setNewTrack(this.videoPlayerRef.nativeElement);
        this.track.attach(element);   
    }

    ngOnDestroy(){
        this.track.detach(this.newTrack);
    }

}