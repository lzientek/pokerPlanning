/**
 * VoteResult
 */

class VoteResult {
    constructor (public userIdWaiting: string[],
                public userVoted: {id: string, voteValue: string}[],
                public id: string) {
    }

    isFinished() {
        if (this.userIdWaiting.length === 0) {
            return true;
        }
        return false;
    }
}

export = VoteResult;
