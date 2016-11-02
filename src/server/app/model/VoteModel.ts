import mongoose = require("mongoose");

interface VoteModel extends mongoose.Document {
    voteValue: number;
    userId: string;
    cardId: string;
};
export = VoteModel;
