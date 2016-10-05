/**
 * Created by Lzientek on 01-10-2016.
 */

import DataAccess = require('../DataAccess');
import IRoomModel = require("./../../model/RoomModel");
import UserSchema = require('./UserSchema');
import CardSchema = require('./CardSchema');

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class RoomSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            creationDate: {
                type: Date,
                default: Date.now,
                required: true
            },
            users: {
                type: [UserSchema.schema],
            },
            cards: {
                type: [CardSchema.schema],
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IRoomModel>("Room", RoomSchema.schema);
export = schema;