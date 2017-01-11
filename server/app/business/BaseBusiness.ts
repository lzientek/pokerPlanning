/**
 * Created by Lzientek on 01-10-2016.
 */

import Read = require("./common/Read");
import Write = require("./common/Write");
interface BaseBusiness<T> extends Read<T>, Write<T>
{
}
export = BaseBusiness;