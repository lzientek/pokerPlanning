/**
 * Created by Lzientek on 01-10-2016.
 */

import express = require("express");
interface ReadController {
    retrieve: express.RequestHandler;
    findById: express.RequestHandler;


}
export = ReadController;