/**
 * Created by Lzientek on 01-10-2016
 */

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { Room } from "../../models/Room";
import { RoomService } from "../../services/room.service";

@Component({
    selector: 'my-dashboard',
    templateUrl: './app/components/dashboard/dashboard.component.html',
    styleUrls: ['./app/components/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    rooms: Room[] = [];

    constructor(
        private router: Router,
        private roomService: RoomService) {
    }

    ngOnInit() {
        this.roomService.getRooms()
            .then(rooms => this.rooms = rooms);
    }

    gotoDetail(room: Room) {
        const link = ['/session', room._id];
        this.router.navigate(link);
    }
}
