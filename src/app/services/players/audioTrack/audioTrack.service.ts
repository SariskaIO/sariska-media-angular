import { ElementRef, Injectable, Input, ViewChild } from "@angular/core";

@Injectable()
export class AudioTrackService {
    constructor() {}
    value: any
    track: any

    getElement(data) {
        return this.value=data;
    }
    getTrack(tr){
        return this.track=tr;
    }

    getAudioTrack(){
        const element = this.getElement(this.value);
        const trackValue=this.getTrack(this.track)
        trackValue.attach(element);

        return () => {
            trackValue.detach(element);
        }
    }
    

}