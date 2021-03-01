import { Component, DoCheck, OnChanges, OnDestroy, OnInit } from "@angular/core";
import SariskaMediaTransport from 'sariska-media-transport';
import { ConstantsService } from "src/app/services/constants/constants.service";
import { UtilsService } from "src/app/services/utils/utils.service";

@Component({
    selector: 'app-connection',
    template: `<app-conference [connection]="connection"></app-conference>`
})

export class ConnectionComponent implements OnInit, OnDestroy{

    constructor(private constantsService: ConstantsService, private utilsService: UtilsService) {}

    connection: any= null;
    token: any = null;


    updateNetwork = ()=>{  //  set internet connectivity status
        SariskaMediaTransport.setNetworkInfo({isOnline: window.navigator.onLine});
    }

    ngOnInit(){
        SariskaMediaTransport.init(this.constantsService.initSDKConfig);
        SariskaMediaTransport.setLogLevel(SariskaMediaTransport.logLevels.ERROR); //TRACE ,DEBUG, INFO, LOG, WARN, ERROR

        let conn: any = null;

        const fetchData =  async ()=>{
            (await this.utilsService.getToken()).subscribe(
              (val: any) => {

            if (!val.token) {
                return;
            }
                              this.token = val.token;
                              conn = new SariskaMediaTransport.JitsiConnection(val.token, this.constantsService.connectionConfig);
            conn.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
            conn.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_FAILED, onConnectionFailed);
            conn.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED, onConnectionDisconnected);
            conn.addEventListener(SariskaMediaTransport.events.connection.PASSWORD_REQUIRED, onConnectionDisconnected);
            conn.connect();
              },
              response => {
                  console.log("POST call in error", response);

              },
              () => {
                  console.log("The POST observable is now completed.");
              });

        }

        const onConnectionSuccess = ()=>{
            this.connection = conn;
        }


        const onConnectionDisconnected = (error)=>{
            console.log('connection disconnect!!!', error);
            if (!this.connection) {
                return;
            }
            this.connection.removeEventListener(
                SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED,
                onConnectionSuccess);
            this.connection.removeEventListener(
                SariskaMediaTransport.events.connection.CONNECTION_FAILED,
                onConnectionFailed);
            this.connection.removeEventListener(
                SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED,
                onConnectionDisconnected);
        }

        const onConnectionFailed = async (error)=> {
            console.log('connection failed!!!', error);
            if (error === "connection.passwordRequired") {  // token expired,  fetch new token and set again
                const token = (await this.utilsService.getToken()).subscribe(
                  (val: any) => {
                      console.log("POST call successful value returned in body",
                                  val);
                                  this.token = val.token;
                                  conn.setToken(token);
                  })
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
