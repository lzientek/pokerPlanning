/**
 * Created by Lzientek on 01-10-2016.
 */

import express = require("express");
import RoomController = require("./../../controllers/RoomController");

var router = express.Router();
class RoomRoutes {
    private _roomController: RoomController;

    constructor () {
        this._roomController = new RoomController();
    }
    get routes () {
        var controller = this._roomController;

        router.get("/", controller.retrieve);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/:_id", controller.findById);
        router.delete("/:_id", controller.delete);

        return router;
    }


}

Object.seal(RoomRoutes);
export = RoomRoutes;