/**
 * Created by Lzientek on 02-10-2016.
 */

import mongoose = require("mongoose");

interface UserModel extends mongoose.Document {
    name: string;
    isSpectator: boolean;
}

export = UserModel;
