
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from "@angular/core";


@Component({
    selector: 'video-track',
    template: `
                <video controls #videoOption>
                    <source src="{{newTrack}}" type="video/mp4" autoplay="true">
                </video>
    `,
    styles: ['video {width: 200px;}']
})
export class VideoTrackComponent implements OnChanges, AfterViewInit, OnDestroy {
    constructor(private cdRef: ChangeDetectorRef ){}

    @Input() track: any;
    newTrack: any;


    ngOnChanges(changes: SimpleChanges){
      console.log('vid', changes);
      this.newTrack=changes.track.currentValue;
    }

    @ViewChild('videoOption') videoPlayerRef: ElementRef;


    ngAfterViewInit(){
      console.log('view', this.newTrack);
        const element = this.videoPlayerRef.nativeElement;
        this.newTrack=this.videoPlayerRef.nativeElement;
        this.track.attach(element);
        element.play();
        this.cdRef.detectChanges();

    }

    ngOnDestroy(){
        this.track.detach(this.newTrack);
    }

}
