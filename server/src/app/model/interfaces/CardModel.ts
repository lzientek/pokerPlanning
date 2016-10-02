/**
 * Created by Lzientek on 02-10-2016.
 */

import mongoose = require("mongoose");

interface CardModel extends mongoose.Document {
    title: string;
    startDate: Date;
    timeToConsensus: number;
    evaluation: number;
}

export = CardModel;