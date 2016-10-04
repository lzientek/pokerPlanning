/**
 * Created by Lzientek on 04-10-2016.
 */

import DataAccess = require('../DataAccess');
import ICardModel = require("./../../model/CardModel");
import Mongoose = require("mongoose");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class CardSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            title : {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                default: Date.now,
                required: true
            },
            timeToConsensus: {
                type: Number,
                required: false,
            },
            evaluation: {
                type: Number,
                required: false,
            },
            room: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'Room',
                required: true,
            },
        });

        return schema;
    }
}
var schema = mongooseConnection.model<ICardModel>("Card", CardSchema.schema);
export = schema;