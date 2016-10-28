/**
 * Created by Lzientek on 01-10-2016.
 */

import express = require('express');
import RoomBusiness = require("./../app/business/RoomBusiness");
import ICardModel = require("./../app/model/CardModel");
import SocketController from './SocketController';

class CardController {

    addCard(req: express.Request, res: express.Response): void {
        try {
            const _id: string = req.params._id;
            const card: ICardModel = <ICardModel> req.body;
            new RoomBusiness().addCard(_id, card, (error, result) => {
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
}
export = CardController;
