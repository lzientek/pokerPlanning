/**
 * Created by Lzientek on 01-10-2016
 */

import {Injectable} from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import Room from "../models/Room";

@Injectable()
export class RoomService {

    private roomsUrl = 'api/rooms';  // URL to web api

    constructor(private http: Http) { }

    getRooms(): Promise<Room[]> {
        return this.http.get(this.roomsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getRoom(id: string) {
        return this.http.get(this.roomsUrl + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(room: Room): Promise<Room>  {
        if (room._id) {
            return this.put(room);
        }
        return this.post(room);
    }

    private post(room: Room): Promise<Room> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.roomsUrl, JSON.stringify(room), {headers:headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(room: Room) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.roomsUrl}/${room._id}`;

        return this.http
            .put(url, JSON.stringify(room), {headers: headers})
            .toPromise()
            .then(() => room)
            .catch(this.handleError);
    }

    delete(room: Room) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.roomsUrl}/${room._id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
