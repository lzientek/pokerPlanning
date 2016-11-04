/**
 * Created by Lzientek on 01-10-2016.
 */

import express = require('express');
import RoomBusiness = require("./../app/business/RoomBusiness");
import ICardModel = require("./../app/model/CardModel");
import IVoteModel = require("./../app/model/VoteModel");

import SocketController from './SocketController';

class CardController {

    addCard(req: express.Request, res: express.Response): void {
        try {
            const _id: string = req.params._id;
            const card: ICardModel = <ICardModel> req.body;
            new RoomBusiness().addCard(_id, card, (error, result) => {
                if (error) {
                    res.send({"error": error});
                } else {
                    res.send(result);
                    SocketController.getInstance().upsertCard(_id, result);
                }
            });
        } catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }

    updateCard(req: express.Request, res: express.Response): void {
        try {
            const _id: string = req.params._id;
            const _cardId: string = req.params._cardId;
            const card: ICardModel = <ICardModel> req.body;
            card._id = _cardId;
            new RoomBusiness().updateCard(_id, card, (error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {
                    res.send(result);
                    SocketController.getInstance().upsertCard(_id, result);
                }
            });
        } catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }

    addVote(req: express.Request, res: express.Response): void {
        const _id: string = req.params._id;
        const _cardId: string = req.params._cardId;
        const vote: IVoteModel = <IVoteModel> req.body;
        vote.cardId = _cardId;
        new RoomBusiness().addVote(_id, vote, (error, result) => {
            if (error) {
                res.send({"error": "error"});
            } else {
                res.send(result);
                SocketController.getInstance().addVote(_id, result);
            }
        });
    }

    updateVote(req: express.Request, res: express.Response): void {
        const _id: string = req.params._id;
        const _cardId: string = req.params._cardId;
        const _voteId: string = req.params._voteId;
        const vote: IVoteModel = <IVoteModel> req.body;
        vote.cardId = _cardId;
        new RoomBusiness().updateVote(_id, _voteId, vote, (error, result) => {
            if (error) {
                res.send({"error": "error"});
            } else {
                res.send(result);
                SocketController.getInstance().addVote(_id, result);
            }
        });
    }


}
export = CardController;
