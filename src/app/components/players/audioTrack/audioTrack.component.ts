import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";


@Component({
    selector: 'audio-track',
    template: `
                <audio #audioOption>
                    <source src="track" type="audio/mp3" autoplay="true">
                </audio>
    `
})
export class AudioTrackComponent implements AfterViewInit, OnDestroy {
    constructor(){}

    @Input() track: any;
    newTrack: any;

    setNewTrack = ( track) => {
        this.newTrack=track;
    }

    @ViewChild('audioOption') audioPlayerRef: ElementRef;


    ngAfterViewInit(){
        const element = this.audioPlayerRef.nativeElement;
        this.setNewTrack(this.audioPlayerRef.nativeElement);
        this.track.attach(element);   
    }

    ngOnDestroy(){
        this.track.detach(this.newTrack);
    }
    

}