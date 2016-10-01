/**
 * Created by Lzientek on 01-10-2016.
 */

import IReadController = require("./interfaces/ReadController");
import IWriteController = require("./interfaces/WriteController");
import IBaseBusiness = require("../app/business/BaseBusiness");
interface BaseController<T extends IBaseBusiness<Object>> extends IReadController, IWriteController{


}
export = BaseController;