/**
 * Created by Lzientek on 01-05-2016
 */

import { Component, Input } from '@angular/core';
import Vote from "../../models/Vote";
import User from "../../models/User";

@Component({
    selector: 'evaluation-display',
    templateUrl: './components/room/evaluationDisplay.component.html',
    styleUrls: ['./styles/room/evaluationDisplay.component.css']
})

export class EvaluationDisplay {
    @Input() vote: Vote;
    @Input() users: User[];
    userId: string;

    constructor() {
        this.userId = localStorage.getItem('userId');
    }

    getUserById(id: string): User {
        return this.users.find(u => u._id === id);
    }
}
