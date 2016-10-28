/**
 * Created by Lzientek on 01-10-2016.
 */

import express = require("express");
import RoomController = require("./../../controllers/RoomController");
import UserController = require("./../../controllers/UserController");
import CardController = require("./../../controllers/CardController");

const router = express.Router();
class RoomRoutes {
    private _roomController: RoomController;
    private _userController: UserController;
    private _cardController: CardController;

    constructor () {
        this._roomController = new RoomController();
        this._userController = new UserController();
        this._cardController = new CardController();
    }
    get routes () {
        router.get("/", this._roomController.retrieve);
        router.post("/", this._roomController.create);
        router.put("/:_id", this._roomController.update);
        router.get("/:_id", this._roomController.findById);
        router.delete("/:_id", this._roomController.delete);

        router.post("/:_id/users", this._userController.addUser);
        router.delete("/:_id/users/:_userId", this._userController.removeUser);

        router.post("/:_id/cards", this._cardController.addCard);
        router.put("/:_id/cards/:_cardId", this._cardController.updateCard);
        return router;
    }
}

Object.seal(RoomRoutes);
export = RoomRoutes;
