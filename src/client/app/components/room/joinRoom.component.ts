/**
 * Created by Lzientek on 01-10-2016
 */

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { RoomService } from "../../services/room.service";
import Room from '../../models/Room';
@Component({
    selector: 'my-join-room',
    templateUrl: './app/components/room/joinRoom.component.html'
})

export class JoinRoomComponent extends OnInit {
    room: Room = new Room();
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private roomService: RoomService) {
            super();
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.roomService.getRoom(id)
                .then(room => this.room = room);
        });
    }
}
