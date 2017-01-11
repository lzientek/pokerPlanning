/**
 * Created by Lzientek on 01-10-2016.
 */

import express = require('express');
import RoomBusiness = require("./../app/business/RoomBusiness");
import IUserModel = require("./../app/model/UserModel");
import SocketController from './SocketController';

class UserController {
    addUser(req: express.Request, res: express.Response): void {
        try {
            const _roomId: string = req.params._id;

            const user: IUserModel = <IUserModel> req.body;
            const roomBusiness = new RoomBusiness();
            roomBusiness.addUser(_roomId, user, (error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {
                    res.send(result);
                    SocketController.getInstance().addUser(_roomId, result);
                }
            });
        } catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }

    removeUser(req: express.Request, res: express.Response): void {
        try {
            let _id: string = req.params._id;
            let _userId: string = req.params._userId;

            let roomBusiness = new RoomBusiness();
            roomBusiness.removeUser(_id, _userId, (error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {res.send(result); }
            });
        } catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }
}
export = UserController;
