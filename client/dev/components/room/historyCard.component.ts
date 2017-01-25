/**
 * Created by Lzientek on 01-10-2016
 */

import { Component, Input } from '@angular/core';
import { Card } from "../../models/Card";

@Component({
    selector: 'my-history-card',
    templateUrl: './components/room/historyCard.component.html',
    styleUrls: ['./styles/room/room.component.css']
})

export class HistoryCard {
    @Input() card: Card;
}
