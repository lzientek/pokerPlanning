/**
 * Created by Lzientek on 01-10-2016
 */
/* GLOBAL io */
declare var io: any;

import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Room from "../../models/Room";
import { Card } from "../../models/Card";
import { RoomService } from "../../services/room.service";
import { CardService } from "../../services/card.service";
import Vote from '../../models/Vote';
@Component({
    selector: 'my-rooms',
    templateUrl: './app/components/room/room.component.html',
    styleUrls: ['./app/components/dashboard/dashboard.component.css']
})

export class RoomComponent implements OnInit {
    room: Room = new Room();
    socket: any = null;
    userId: string;
    vote: Vote = new Vote();
    cardTitle: string;

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService,
        private roomService: RoomService) {
            this.userId = localStorage.getItem('userId');
    }

    ngOnInit() {
        this.socket = io();
        this.route.params.forEach((params: Params) => {
            const roomId = params['id'];
            this.socket.emit('join_room', { roomId: roomId });
            this.socket.on('upsert_card', this.upsertCard.bind(this));
            this.roomService.getRoom(roomId)
                .then(room => this.room = room);
        });
    }

    upsertCard(card: Card) {
        console.log('this', this);
        console.log('card', card);
        for (let i = 0; i < this.room.cards.length; i++) {
            if (this.room.cards[i]._id === card._id) {
                this.room.cards[i] = card;
                return ;
            }
        }
        this.newCard(card);
    }

    private newCard(card: Card) {
        this.room.cards.push(card);
        this.vote = new Vote(card._id);
    }

    getCardById(id: string): Card {
        const filterResult = this.room.cards.filter(card => card._id === id);
        if (filterResult && filterResult.length > 0) {
            return filterResult[0];
        }
        return new Card();
    }

    createCard() {
        const card = new Card();
        card.evaluation = null;
        card.title = this.cardTitle;
        this.cardService.addCard(this.room._id, card);
    }

    selectVoteValue(value: number) {
        console.log(value);
    }

}
