/**
 * Created by Lzientek on 01-10-2016
 */
/* GLOBAL io */
declare var io: any;

import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Card } from "../../models/Card";
import { CardService } from "../../services/card.service";
import Room from "../../models/Room";
import { RoomService } from "../../services/room.service";
import { User } from"../../models/User";
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
            this.socket.on('new_vote', this.newVote.bind(this));
            this.roomService.getRoom(roomId)
                .then((room: Room) => {
                    if (room.cards && room.cards.length > 0) {
                        this.vote.cardId = room.cards[room.cards.length - 1]._id;
                    }
                    this.room = room;
                });
        });
    }

    upsertCard(card: Card) {
        for (let i = 0; i < this.room.cards.length; i++) {
            if (this.room.cards[i]._id === card._id) {
                this.room.cards[i] = card;
                return;
            }
        }
        this.newCard(card);
    }

    private newCard(card: Card) {
        this.room.cards.push(card);
        this.vote = new Vote(card._id);
        for (let j = 0; j < this.room.users.length; j++) {
            this.room.users[j].hasVoted = this.room.users[j].isSpectator ? null : false ;
        }
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
        if (this.vote.actualVote) {
            this.cardService.updateVote(this.room._id, this.vote.cardId, this.vote.actualVoteId, value);
        }
        this.cardService.addVote(this.room._id, this.vote.cardId, this.userId, value)
            .then(result => {
                this.vote.actualVote = value;
                this.vote.peopleWhoVoted = result.userVoted;
                this.vote.userIdWaiting = result.userIdWaiting;
                this.vote.actualVoteId = result.id;
                this.updateUserVoteState();
            }).catch(err => console.error('vote error:', err));
    }

    newVote(result: any) {
        this.vote.peopleWhoVoted = result.userVoted;
        this.vote.userIdWaiting = result.userIdWaiting;
        this.updateUserVoteState();
    }

    updateUserVoteState() {
        for (let j = 0; j < this.room.users.length; j++) {
            this.room.users[j].hasVoted = this.room.users[j].isSpectator ? null : true ;
        }
        for (let i = 0; i < this.vote.userIdWaiting.length; i++) {
            this.getUserById(this.vote.userIdWaiting[i]).hasVoted = false;
        }
    }

    private getUserById(userId: string): User {
        for (let i = 0; i < this.room.users.length; i++ ) {
            if (this.room.users[i]._id === userId) {
                return this.room.users[i];
            }
        }
        return null;
    }
}
