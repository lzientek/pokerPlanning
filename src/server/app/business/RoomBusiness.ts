/**
 * Created by Lzientek on 01-10-2016.
 */

import RoomRepository = require("./../repository/RoomRepository");
import BaseBusiness = require("./BaseBusiness");
import IRoomModel = require("./../model/RoomModel");
import IUserModel = require("./../model/UserModel");
import ICardModel = require("./../model/CardModel");

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
            if (err) {
                callback(err, res);
            } else {
                this._roomRepository.update(res._id, item, callback);
            }
        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._roomRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IRoomModel) => void) {
        this._roomRepository.findById(_id, callback);
    }

    addUser (_id: string, item: IUserModel, callback: (error: any, result: IRoomModel) => void) {
        this._roomRepository.findById(_id, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                res.users.push(item);
                this._roomRepository.update(res._id, res, callback);
            }
        });
    }

    removeUser (_id: string, _userId: string, callback: (error: any, result: any) => void) {
        this._roomRepository.findById(_id, (err, room) => {
            if (err) {
                callback(err, null);
            } else {
                for (var index = room.users.length - 1; index >= 0; index--) {
                    if (room.users[index]._id === _userId) {
                        room.users.splice(index, 1);
                    }
                }
                this._roomRepository.update(room._id, room, error => callback(error, room));
            }
        });
    }

    addCard (_id: string, item: ICardModel, callback: (error: any, result: IRoomModel) => void) {
        this._roomRepository.findById(_id, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                res.cards.push(item);
                this._roomRepository.update(res._id, res, error => callback(error, res));
            }
        });
    }

    updateCard (_id: string, item: ICardModel, callback: (error: any, result: IRoomModel) => void) {
        this._roomRepository.findById(_id, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                for (var index = res.users.length - 1; index > 0; index--) {
                    if (res.cards[index]._id === item._id) {
                        res.cards[index] = item;
                    }
                }
                this._roomRepository.update(res._id, res, callback);
            }
        });
    }
}


Object.seal(RoomBusiness);
export = RoomBusiness;