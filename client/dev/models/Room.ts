/**
 * Created by Lzientek on 01-10-2016.
 */

import User from "./User";
import { Card } from "./Card";

export default class Room {
    _id: string;
    name: string;
    creationDate: Date;
    users: User[];
    cards: Card[];
    constructor() {
        this.users = [];
        this.cards = [];
    }
}
