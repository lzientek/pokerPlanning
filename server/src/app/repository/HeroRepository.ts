/**
 * Created by Lzientek on 01-10-2016.
 */

import IRoomModel = require("./../model/interfaces/HeroModel");
import HeroSchema = require("./../dataAccess/schemas/HeroSchema");
import RepositoryBase = require("./BaseRepository");

class HeroRepository  extends RepositoryBase<IRoomModel> {
    constructor () {
        super(HeroSchema);
    }
}

Object.seal(HeroRepository);
export = HeroRepository;