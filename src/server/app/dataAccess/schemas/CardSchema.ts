/**
 * Created by Lzientek on 04-10-2016.
 */

import DataAccess = require('../DataAccess');

const mongoose = DataAccess.mongooseInstance;

class CardSchema {

    static get schema () {
        const schema =  mongoose.Schema({
            title : {
                type: String,
                required: false
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
        });

        return schema;
    }
}
export = CardSchema;
