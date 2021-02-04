import { ElementRef, Injectable } from "@angular/core";

@Injectable()
export class VideoTrackService {
    constructor() {}
    value: any
    track: any

    getElement(data) {
        return this.value=data;
    }
    getTrack(tr){
        return this.track=tr;
    }

    getVideoTrack(){
        const element = this.getElement(this.value);
        const trackValue=this.getTrack(this.track)
        trackValue.attach(element);

        return () => {
            trackValue.detach(element);
        }
    }
    
}