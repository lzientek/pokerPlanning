/**
 * Created by Lzientek on 28-10-2016.
 */

export default class Vote {
    cardId: string;
    actualVote: number;
    actualVoteId: string;
    waitingForOther: boolean;
    userIdWaiting: string[];
    peopleWhoVoted: {id: string, voteValue: number}[];

    constructor(cardId: string = null) {
        this.cardId = cardId;
    }
}