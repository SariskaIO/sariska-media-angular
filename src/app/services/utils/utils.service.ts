import { Injectable } from '@angular/core';
import { ConstantsService } from '../constants/constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
    constructor(private constantsService: ConstantsService, private http: HttpClient) {}

    async getToken() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return await this.http.post(this.constantsService.GENERATE_TOKEN_URL, JSON.stringify({
            sessionId: 'test4331ee234', // enter your sessionId
            apiKey: '24fd6f92d6d017492e3e98e334ebafc76dd350bb93a0729d38', // enter your api key
            // user: {  Optionally, you can provide user display information
            //     id: <user_id>
            //     name: <user_name>,
            //     avatar: <user_avatar>,
            //     email: <user_email>
            // }
        }), httpOptions);
    }
}
