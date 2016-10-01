/**
 * Created by Lzientek on 01-10-2016.
 */

import BaseBusiness = require("./../BaseBusiness");
import IHeroModel = require("./../../model/interfaces/HeroModel");

interface HeroBusiness extends BaseBusiness<IHeroModel> {

}
export = HeroBusiness;