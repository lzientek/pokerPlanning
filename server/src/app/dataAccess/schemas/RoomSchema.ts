/**
 * Created by Lzientek on 01-10-2016.
 */

import DataAccess = require('../DataAccess');
import IRoomModel = require("./../../model/RoomModel");
import Mongoose = require("mongoose");
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
                type: [Mongoose.Schema.Types.ObjectId],
                ref: 'User',
            },
            cards: {
                type: [Mongoose.Schema.Types.ObjectId],
                ref: 'Card',
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IRoomModel>("Room", RoomSchema.schema);
export = schema;