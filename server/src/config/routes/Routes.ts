/**
 * Created by Lzientek on 01-10-2016.
 */
import express = require('express');
import path = require('path');

import RoomRoutes = require('../routes/RoomRoutes');

var app = express();

class Routes {

    get routes() {

        app.use("/rooms", new RoomRoutes().routes);

        return app;
    }
}
export = Routes;