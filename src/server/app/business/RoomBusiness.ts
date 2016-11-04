/**
 * Created by Lzientek on 01-10-2016.
 */

import RoomRepository = require("./../repository/RoomRepository");
import BaseBusiness = require("./BaseBusiness");
import IRoomModel = require("./../model/RoomModel");
import IUserModel = require("./../model/UserModel");
import ICardModel = require("./../model/CardModel");
import IVoteModel = require("./../model/VoteModel");
import VoteResult = require("./../model/VoteResult");

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

    delete (_id: string, callback: (error: any, result: any) => void) {
        this._roomRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IRoomModel) => void) {
        this._roomRepository.findById(_id, callback);
    }

    addUser (_id: string, item: IUserModel, callback: (error: any, result: IUserModel) => void) {
        this._roomRepository.addUser(_id, item, (error, val) => {
            callback(error, val.users[val.users.length - 1]);
        });
    }

    removeUser (_id: string, _userId: string, callback: (error: any, result: any) => void) {
        this._roomRepository.findById(_id, (err, room) => {
            if (err) {
                callback(err, null);
            } else {
                for (let index = room.users.length - 1; index >= 0; index--) {
                    if (room.users[index]._id === _userId) {
                        room.users.splice(index, 1);
                    }
                }
                this._roomRepository.update(room._id, room, error => callback(error, room));
            }
        });
    }

    addCard (_id: string, item: ICardModel, callback: (error: any, result: ICardModel) => void) {
        this._roomRepository.addCard(_id, item, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                callback(err, res.cards[res.cards.length - 1]);
            }
        });
    }

    updateCard (_id: string, item: ICardModel, callback: (error: any, result: ICardModel) => void) {
        this._roomRepository.findById(_id, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                for (let index = res.users.length - 1; index > 0; index--) {
                    if (res.cards[index]._id === item._id) {
                        res.cards[index] = item;
                    }
                }
                this._roomRepository.update(res._id, res, error => callback(error, item));
            }
        });
    }

    addVote(_id: string, item: IVoteModel, callback: (error: any, result: VoteResult) => void) {
        this._roomRepository.addVote(_id, item, (error, val) => {
            callback(error, this.roomToVoteResult(error, val, item));
        });
    }

    updateVote(_id: string, _voteId: string
        , item: IVoteModel, callback: (error: any, result: VoteResult) => void) {
        this._roomRepository.findById(_id, (error, val) => {
            if (error) { return callback(error, null); }
            for (let i = 0; i < val.votes.length; i++) {
                if (val.votes[i]._id === _voteId) {
                    val.votes[i].voteValue = item.voteValue;
                }
            }
            this._roomRepository.update(val._id, val
                , error => callback(error, this.roomToVoteResult(error, val, item, _voteId)));
        });
    }

    private roomToVoteResult (error, val: IRoomModel, item: IVoteModel, id: string = null) {
        let res = new VoteResult(null, null, null);
        if (!error && val) {
            const users: string[] = [];
            const usersWhoVoted: { id: string, voteValue: number }[] = [];
            const actualVote = val.votes.filter(vote =>
            { 
                return vote.cardId === item.cardId;
            });

            for (let j = 0; j < val.users.length; j++) {
                users.push(val.users[j]._id.toHexString());
            }
            for (let i = 0; i < actualVote.length; i++) {
                usersWhoVoted.push({ id: actualVote[i].userId, voteValue: actualVote[i].voteValue });
                const index = users.indexOf(actualVote[i].userId);
                if (index >= 0) {
                    users.splice(index, 1);
                }
            }
            res = new VoteResult(users, usersWhoVoted, id || val.votes[val.votes.length - 1]._id);
        }
        return res;
    }
}


Object.seal(RoomBusiness);
export = RoomBusiness;
