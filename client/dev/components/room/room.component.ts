/**
 * Created by Lzientek on 01-10-2016
 */
/* GLOBAL io */
declare var io: any;

import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Card } from "../../models/Card";
import { CardService } from "../../services/card.service";
import Room from "../../models/Room";
import { RoomService } from "../../services/room.service";
import { User } from"../../models/User";
import Vote from '../../models/Vote';
import { ModalComponent } from '../global/modal.component';

@Component({
    selector: 'my-rooms',
    templateUrl: './components/room/room.component.html',
    styleUrls: ['./styles/room/room.component.css']
})

export class RoomComponent implements OnInit {
    room: Room = new Room();
    socket: any = null;
    userId: string;
    vote: Vote = new Vote();
    cardTitle: string;
    shareUrl: string = location.href.split('#')[0];
    @ViewChild("newCardModal") newCardModal: ModalComponent;
    @ViewChild("consensusModal") consensusModal: ModalComponent;
    @ViewChild("shareModal") shareModal: ModalComponent;

    cardsValues: string[] =
        ['0.5', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '?', 'coffee'];

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
            this.socket.emit('join_room', { roomId: roomId, userId: this.userId });
            this.socket.on('upsert_card', this.upsertCard.bind(this));
            this.socket.on('new_vote', this.newVote.bind(this));
            this.socket.on('new_user', this.newUser.bind(this));
            this.socket.on('activate_user', this.activateUser.bind(this));
            this.socket.on('user_disconnect', this.removeUser.bind(this));
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

    selectVoteValue(value: string) {
        this.cardService.addVote(this.room._id, this.vote.cardId, this.userId, value)
        .then(result => {
            this.vote.actualVote = value;
            this.vote.peopleWhoVoted = result.userVoted;
            this.vote.userIdWaiting = result.userIdWaiting;
            this.updateUserVoteState();
        }).catch(err => console.error('vote error:', err));
    }

    openCardModalModal() {
        this.newCardModal.showModal();
    }

    newVote(result: any) {
        this.vote.peopleWhoVoted = result.userVoted;
        this.vote.userIdWaiting = result.userIdWaiting;
        this.updateUserVoteState();
        if (this.vote.userIdWaiting.length === 0) {
            this.allUserHaveVote();
        }
    }

    updateUserVoteState() {
        for (let j = 0; j < this.room.users.length; j++) {
            this.room.users[j].hasVoted = this.room.users[j].isSpectator ? null : true ;
        }
        for (let i = 0; i < this.vote.userIdWaiting.length; i++) {
            this.getUserById(this.vote.userIdWaiting[i]).hasVoted = false;
        }
    }

    clearLocalVote() {
        this.vote.actualVote = null;
    }

    //private methods:

    private newCard(card: Card) {
        this.room.cards.push(card);
        this.vote = new Vote(card._id);
        for (let j = 0; j < this.room.users.length; j++) {
            this.room.users[j].hasVoted = this.room.users[j].isSpectator ? null : false ;
        }
    }

    private newUser(user: User) {
        this.room.users.push(user);
    }

    private removeUser(userId: string) {
        const indexToRemove  = this.room.users.findIndex(u => u._id === userId);
        if (indexToRemove >= 0) {
            this.room.users[indexToRemove].isActive = false;
        }
    }

    private activateUser(userId: string) {
        const indexToRemove  = this.room.users.findIndex(u => u._id === userId);
        if (indexToRemove >= 0) {
            this.room.users[indexToRemove].isActive = true;
        }
    }

    private allUserHaveVote() {
        const votes: {[id: string]: number} = {};
        let count = 0;
        for (let i = 0; i < this.vote.peopleWhoVoted.length; i++) {
            if (!votes[this.vote.peopleWhoVoted[i].voteValue.toString()]) {
                votes[this.vote.peopleWhoVoted[i].voteValue.toString()] = 1;
                count++;
            } else {
                votes[this.vote.peopleWhoVoted[i].voteValue.toString()] += 1;
            }
        }

        if (count === 1) {
            this.vote.isConsensus = true;
            this.room.cards[this.room.cards.length - 1].evaluation = parseInt(this.vote.actualVote, 10);
            this.consensusModal.showModal();
        } else {
            console.log("votes", votes);
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
