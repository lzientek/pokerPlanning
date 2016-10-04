/**
 * Created by Lzientek on 04-10-2016.
 */

import DataAccess = require('../DataAccess');
import IUserModel = require("./../../model/UserModel");
import Mongoose = require("mongoose");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            isSpectator: {
                type: Boolean,
                default: false,
                required: true
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
var schema = mongooseConnection.model<IUserModel>("User", UserSchema.schema);
export = schema;