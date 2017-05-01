/**
 * Created by Lzientek on 01-10-2016
 */

import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import User from "../models/User";

@Injectable()
export class UserService {

    private roomsUrl = 'api/rooms';  // URL to web api

    constructor(private http: Http) { }

    addUser(id: string, user: User) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(`${this.roomsUrl}/${id}/users`, JSON.stringify(user), { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
