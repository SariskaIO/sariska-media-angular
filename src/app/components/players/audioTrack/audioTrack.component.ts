import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";


@Component({
    selector: 'app-audio-track',
    template: `<audio autoplay="true" #audioOption></audio>`
})

export class AudioTrackComponent implements AfterViewInit, OnDestroy {
    constructor(private cdRef: ChangeDetectorRef ){}

    @Input() track: any;


    @ViewChild('audioOption') audioPlayerRef: ElementRef;


    ngAfterViewInit(){
        const element = this.audioPlayerRef.nativeElement;
        this.track.attach(element);
    }

    ngOnDestroy(){
        const element = this.audioPlayerRef.nativeElement;
        this.track.detach(element);
    }
}
