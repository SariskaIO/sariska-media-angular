import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";


@Component({
    selector: 'audio-track',
    template: `
                <audio #audioOption>
                    <source src="track" type="audio/mp3" autoplay="true">
                </audio>
    `
})
export class AudioTrackComponent implements AfterViewInit, OnDestroy {
    constructor(private cdRef: ChangeDetectorRef ){}

    @Input() track: any;
    newTrack: any;


    @ViewChild('audioOption') audioPlayerRef: ElementRef;


    ngAfterViewInit(){
        const element = this.audioPlayerRef.nativeElement;
        this.newTrack= this.audioPlayerRef.nativeElement;
        this.track.attach(element);
        element.play();

        this.cdRef.detectChanges();
    }

    ngOnDestroy(){
        this.track.detach(this.newTrack);
    }


}
