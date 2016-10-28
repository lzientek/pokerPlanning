/**
 * Created by Lzientek on 28-10-2016.
 */

export default class Vote {
    cardId: string;
    actualVote: number;
    waitingForOther: boolean;
    peopleWhoVoted: [ string ];

    constructor(cardId: string = null) {
        this.cardId = cardId;
    }
}
