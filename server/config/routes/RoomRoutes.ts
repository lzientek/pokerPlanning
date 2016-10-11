/**
 * Created by Lzientek on 01-10-2016.
 */

import express = require("express");
import RoomController = require("./../../controllers/RoomController");
import UserController = require("./../../controllers/UserController");

const router = express.Router();
class RoomRoutes {
    private _roomController: RoomController;
    private _userController: UserController;

    constructor () {
        this._roomController = new RoomController();
        this._userController = new UserController();
    }
    get routes () {
        router.get("/", this._roomController.retrieve);
        router.post("/", this._roomController.create);
        router.put("/:_id", this._roomController.update);
        router.get("/:_id", this._roomController.findById);
        router.delete("/:_id", this._roomController.delete);

        router.post("/:_id/user", this._userController.addUser);
        router.delete("/:_id/user/:_userId", this._userController.removeUser);
        return router;
    }
}

Object.seal(RoomRoutes);
export = RoomRoutes;
