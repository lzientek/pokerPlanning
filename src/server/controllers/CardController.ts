/**
 * Created by Lzientek on 01-10-2016.
 */

import express = require('express');
import RoomBusiness = require("./../app/business/RoomBusiness");
import ICardModel = require("./../app/model/CardModel");
import SocketController from './SocketController';

class CardController {
    socket: SocketController;
    roomBusiness: RoomBusiness;

    constructor() {
        this.socket = SocketController.getInstance();
        this.roomBusiness = new RoomBusiness();
    }

    addCard(req: express.Request, res: express.Response): void {
        try {
            const _id: string = req.params._id;
            const card: ICardModel = <ICardModel> req.body;
            this.roomBusiness.addCard(_id, card, (error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {
                    res.send(result);
                    this.socket.upsertCard(_id, result);
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
            const card: ICardModel = <ICardModel> req.body;

            this.roomBusiness.updateCard(_id, card, (error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {
                    res.send(result);
                    this.socket.upsertCard(_id, result);
                }
            });
        } catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }
}
export = CardController;
