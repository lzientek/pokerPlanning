/**
 * Created by Lzientek on 01-10-2016
 */

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { RoomService } from "../../services/room.service";
import { UserService } from "../../services/user.service";
import Room from '../../models/Room';
import { User } from '../../models/User';

@Component({
    selector: 'my-join-room',
    templateUrl: './app/components/room/joinRoom.component.html'
})

export class JoinRoomComponent extends OnInit {
    room: Room = new Room();
    nUser: User = new User();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private roomService: RoomService,
        private userService: UserService) {
            super();
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.roomService.getRoom(id)
                .then(room => this.room = room);
        });
    }

    joinRoom() {
        this.roomService.add(room)
            .then((result) => {
                this.router.navigateByUrl(`/join/${result._id}`);
            })
            .catch((err) => {
                alert(`Une erreur est survenue ${err.message}`);
            });
    }
}
