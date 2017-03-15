import mongoose = require("mongoose");

interface VoteModel extends mongoose.Document {
    voteValue: string;
    userId: string;
};
export = VoteModel;
