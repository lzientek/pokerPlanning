/**
 * Created by Lzientek on 01-10-2016
 */

import {Component} from '@angular/core';
import { Router } from '@angular/router';

import { RoomService } from "../../services/room.service";
import Room from '../../models/Room';
@Component({
    selector: 'my-dashboard',
    templateUrl: './components/dashboard/dashboard.component.html',
    styleUrls: ['./styles/dashboard/dashboard.component.css']
})

export class DashboardComponent {
    roomName: string = '';
    roomId: string = '';
    constructor(
        private router: Router,
        private roomService: RoomService) {
    }

    createRoom() {
        const room: Room = new Room();
        room.name = this.roomName;
        this.roomService.save(room)
            .then((result) => {
                this.router.navigateByUrl(`/join/${result._id}`);
            })
            .catch((err) => {
                alert(`Une erreur est survenue ${err.message}`);
            });

    }

    joinRoom() {
        this.router.navigateByUrl(`/join/${this.roomId}`);
    }
}
