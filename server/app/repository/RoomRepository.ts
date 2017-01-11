/**
 * Created by Lzientek on 01-10-2016.
 */

import IRoomModel = require("./../model/RoomModel");
import RoomSchema = require("./../dataAccess/schemas/RoomSchema");
import RepositoryBase = require("./BaseRepository");
import IUser = require("../model/UserModel");
import IVote = require("../model/VoteModel");
import ICardModel = require("../model/CardModel");

class RoomRepository  extends RepositoryBase<IRoomModel> {
    constructor () {
        super(RoomSchema);
    }

    addUser(_id: string, user: IUser, callback: (error: any, result: IRoomModel) => void) {
        this._model.findByIdAndUpdate( _id,
        {$push: {"users": user}},
        { upsert: true, new : true}, callback);
    }

    addVote(_id: string, vote: IVote, callback: (error: any, result: IRoomModel) => void) {
        this._model.findByIdAndUpdate( _id,
        {$push: {"votes": vote}},
        { upsert: true, new : true}, callback);
    }

    addCard (_id: string, item: ICardModel, callback: (error: any, result: IRoomModel) => void) {
        this._model.findByIdAndUpdate( _id,
            {$push: {"cards": item}},
            { upsert: true, new : true}, callback);
    }
}

Object.seal(RoomRepository);
export = RoomRepository;
