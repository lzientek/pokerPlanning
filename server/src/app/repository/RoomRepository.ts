/**
 * Created by Lzientek on 01-10-2016.
 */

import IRoomModel = require("./../model/RoomModel");
import RoomSchema = require("./../dataAccess/schemas/RoomSchema");
import RepositoryBase = require("./BaseRepository");

class RoomRepository  extends RepositoryBase<IRoomModel> {
    constructor () {
        super(RoomSchema);
    }
}

Object.seal(RoomRepository);
export = RoomRepository;