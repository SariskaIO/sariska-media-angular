import { Component, DoCheck, OnDestroy, OnInit } from "@angular/core";
import JitsiMeetJS from 'sariska-media-transport';
import { ConstantsService } from "src/app/services/constants/constants.service";
import { UtilsService } from "src/app/services/utils/utils.service";

@Component({
    selector: 'connection',
    template: `<conference [connection]="connection"></conference>`
})

export class ConnectionComponent implements OnInit, DoCheck, OnDestroy{

    constructor(private constantsService: ConstantsService, private utilsService: UtilsService) {}

    connection: any= null;

    setConnection(newConnection){
        this.connection=newConnection
    }

    updateNetwork = ()=>{  //  set internet connectivity status
        JitsiMeetJS.setNetworkInfo({isOnline: window.navigator.onLine});
    }

    ngOnInit(){
        JitsiMeetJS.init(this.constantsService.initSDKConfig);
        JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR); //TRACE ,DEBUG, INFO, LOG, WARN, ERROR
    }

    ngDoCheck(){
        let conn;

        const fetchData =  async ()=>{
            const token = await this.utilsService.getToken();
            if (!token) {
                return;
            }
            conn = new JitsiMeetJS.JitsiConnection(token, this.constantsService.connectionConfig);
            conn.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
            conn.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
            conn.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, onConnectionDisconnected);
            conn.addEventListener(JitsiMeetJS.events.connection.PASSWORD_REQUIRED, onConnectionDisconnected);
            conn.connect();
        }

        const onConnectionSuccess = ()=>{
            this.setConnection(conn);
        }
        

        const onConnectionDisconnected = (error)=>{
            console.log('connection disconnect!!!', error);
            if (!this.connection) {
                return;
            }
            this.connection.removeEventListener(
                JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
                onConnectionSuccess);
            this.connection.removeEventListener(
                JitsiMeetJS.events.connection.CONNECTION_FAILED,
                onConnectionFailed);
            this.connection.removeEventListener(
                JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
                onConnectionDisconnected);
        }

        const onConnectionFailed = async (error)=> {
            console.log('connection failed!!!', error);
            if (error === "connection.passwordRequired") {  // token expired,  fetch new token and set again
                const token = await this.utilsService.getToken();
                conn.setToken(token);
            }
        }

        window.addEventListener("offline", this.updateNetwork);
        window.addEventListener("online", this.updateNetwork);

        fetchData();

    }

    ngOnDestroy(){
        window.removeEventListener("offline", this.updateNetwork);
        window.removeEventListener("online", this.updateNetwork);
        }
}