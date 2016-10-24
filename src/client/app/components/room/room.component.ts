/**
 * Created by Lzientek on 01-10-2016
 */
/* GLOBAL io */
declare var io: any;

import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Room from "../../models/Room";
import { RoomService } from "../../services/room.service";

@Component({
    selector: 'my-rooms',
    templateUrl: './app/components/room/room.component.html',
    styleUrls: ['./app/components/dashboard/dashboard.component.css']
})

export class RoomComponent implements OnInit {
    room: Room = new Room();
    socket: any = null;
    userId: string;

    cardTitle: string;

    constructor(
        private route: ActivatedRoute,
        private roomService: RoomService) {
            this.userId = localStorage.getItem('userId');
    }

    ngOnInit() {
        this.socket = io();
        this.route.params.forEach((params: Params) => {
            const roomId = params['id'];
            this.socket.emit('join_room', { roomId: roomId });
            this.roomService.getRoom(roomId)
                .then(room => this.room = room);
        });
    }

    createCard() {

    }


}
