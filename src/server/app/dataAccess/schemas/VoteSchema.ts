/**
 * Created by Lzientek on 04-10-2016.
 */

import DataAccess = require('../DataAccess');
import Mongoose = require("mongoose");
const mongoose = DataAccess.mongooseInstance;

class VoteSchema {

    static get schema () {
        const schema =  mongoose.Schema({
            voteValue: {
                type: Number,
                required: true,
            },
            userId: {
                type: String,
                required: true,
            },
            cardId: {
                type: String,
                required: true,
            },
        });

        return schema;
    }
}
export = VoteSchema;
