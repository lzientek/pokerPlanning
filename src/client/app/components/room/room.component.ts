/**
 * Created by Lzientek on 01-10-2016
 */

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
    constructor(
        private route: ActivatedRoute,
        private roomService: RoomService) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.roomService.getRoom(id)
                .then(room => this.room = room);
        });
    }
}
