import { Injectable } from "@angular/core";
import { ConstantsService } from "../constants/constants.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    constructor(private constantsService: ConstantsService, private http: HttpClient) {}



    async getToken(){

      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      // const body= JSON.stringify({
      //           sessionId: "test6we9999j9e8", // enter your sessionId
      //           apiKey: "24fd6f92d6d017492e3e98e334ebafc76dd350bb93a0729d38", // enter your app secret
      //           // user: {  Optionally, you can provide user display information for better tracking and user experience
      //           //     id: <user_id>
      //           //     name: <user_name>,
      //           //     avatar: <user_avatar>,
      //           //     email: <user_email>
      //           // }
      //       })
          return  await this.http.post(this.constantsService.GENERATE_TOKEN_URL, JSON.stringify({
          sessionId: "test6we9999j9e8", // enter your sessionId
          apiKey: "24fd6f92d6d017492e3e98e334ebafc76dd350bb93a0729d38", // enter your app secret
          // user: {  Optionally, you can provide user display information for better tracking and user experience
          //     id: <user_id>
          //     name: <user_name>,
          //     avatar: <user_avatar>,
          //     email: <user_email>
          // }
      }), httpOptions);
    //     const body = {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         sessionId: "test6we9999j9e8", // enter your sessionId
    //         apiKey: "24fd6f92d6d017492e3e98e334ebafc76dd350bb93a0729d38", // enter your app secret
    //         // user: {  Optionally, you can provide user display information for better tracking and user experience
    //         //     id: <user_id>
    //         //     name: <user_name>,
    //         //     avatar: <user_avatar>,
    //         //     email: <user_email>
    //         // }
    //     })
    // };
    // try {
    //     const response = await this.http.post(this.constantsService.GENERATE_TOKEN_URL, body, httpOptions).pipe
    //     (tap(token => {}
    //     if (response.ok) {
    //         const json = await response.json();
    //         return json.token;
    //     } else {
    //         console.log(response.status);
    //     }
    //     );
    // } catch (error) {
    //     console.log('error', error);
    // }
    // }

}
}
