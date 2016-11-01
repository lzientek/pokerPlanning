/**
 * Created by Lzientek on 04-10-2016.
 */

import DataAccess = require('../DataAccess');
const mongoose = DataAccess.mongooseInstance;

class UserSchema {

    static get schema () {
        const schema =  mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            isSpectator: {
                type: Boolean,
                default: false,
                required: true
            },
        });

        return schema;
    }
}
export = UserSchema;
