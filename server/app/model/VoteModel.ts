import mongoose = require("mongoose");

interface VoteModel extends mongoose.Document {
    voteValue: string;
    userId: string;
    cardId: string;
};
export = VoteModel;
