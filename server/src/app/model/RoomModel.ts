/**
 * Created by Lzientek on 01-10-2016.
 */

import mongoose = require("mongoose");
import IUser = require("./UserModel");
import ICard = require("./CardModel");

interface RoomModel extends mongoose.Document {
    name: string;
    creationDate: Date;
    users: IUser[];
    cards: ICard[];
}

export = RoomModel;