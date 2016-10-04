/**
 * Created by Lzientek on 01-10-2016.
 */

import RoomRepository = require("./../repository/RoomRepository");
import BaseBusiness = require("./BaseBusiness");
import IRoomModel = require("./../model/RoomModel");

class RoomBusiness implements BaseBusiness<IRoomModel> {
    private _roomRepository: RoomRepository;

    constructor () {
        this._roomRepository = new RoomRepository();
    }

    create (item: IRoomModel, callback: (error: any, result: any) => void) {
        this._roomRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._roomRepository.retrieve(callback);
    }

    update (_id: string, item: IRoomModel, callback: (error: any, result: any) => void) {

        this._roomRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._roomRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._roomRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IRoomModel) => void) {
        this._roomRepository.findById(_id, callback);
    }

}


Object.seal(RoomBusiness);
export = RoomBusiness;