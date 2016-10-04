/**
 * Created by Lzientek on 01-10-2016.
 */

class Constants {
    static DB_CONNECTION_STRING: string = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://localhost:27017/pokerPlanning";
}
Object.seal(Constants);
export = Constants;