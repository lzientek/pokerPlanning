/**
 * Created by Lzientek on 28-10-2016
 */

import 'rxjs/add/operator/toPromise';

import { Headers, Http } from '@angular/http';

import { Card } from "../models/Card";
import { Injectable } from '@angular/core';

@Injectable()
export class CardService {

    private roomsUrl = 'api/rooms';  // URL to web api

    constructor(private http: Http) { }

    addCard(id: string, card: Card) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(`${this.roomsUrl}/${id}/cards`, JSON.stringify(card), { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    updateCard(roomId: string, card: Card) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .put(`${this.roomsUrl}/${roomId}/cards/${card._id}`, JSON.stringify(card), { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    addVote(id: string, cardId: string, userId: string, voteValue: string) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(`${this.roomsUrl}/${id}/cards/${cardId}/votes`
            , JSON.stringify({ userId, voteValue }), { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
