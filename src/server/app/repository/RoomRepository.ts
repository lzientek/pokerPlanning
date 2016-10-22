/**
 * Created by Lzientek on 01-10-2016.
 */

import IRoomModel = require("./../model/RoomModel");
import RoomSchema = require("./../dataAccess/schemas/RoomSchema");
import RepositoryBase = require("./BaseRepository");
import IUser = require("../model/UserModel");

class RoomRepository  extends RepositoryBase<IRoomModel> {
    constructor () {
        super(RoomSchema);
    }

    addUser(_id: string, user: IUser, callback: (error: any, result: IRoomModel) => void) {
        this._model.findByIdAndUpdate( _id,
        {$push: {"users": user}},
        { upsert: true, new : true}, callback);
    }
}

Object.seal(RoomRepository);
export = RoomRepository;
