/**
 * Created by Lzientek on 01-10-2016.
 */

import mongoose = require("mongoose");

interface HeroModel extends mongoose.Document {
    power: string;
    amountPeopleSaved: number;
    name: string;
}

export = HeroModel;