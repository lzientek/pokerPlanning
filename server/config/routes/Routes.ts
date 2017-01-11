/**
 * Created by Lzientek on 01-10-2016.
 */
import express = require('express');
import RoomRoutes = require('../routes/RoomRoutes');

const app = express();

export default class Routes {

    get routes() {
        app.use("/rooms", new RoomRoutes().routes);
        return app;
    }
}
