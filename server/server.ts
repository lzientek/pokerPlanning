/// <reference path="../typings/index.d.ts" />
import * as bodyParser from "body-parser";
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';

import BaseRoutes from "./config/routes/Routes";
import SocketController from './controllers/SocketController';

const port: number = <number> (process.env['PORT'] || 3000);
const env: string = process.env['NODE_ENV'] || 'developement';

const app = express();

const server = http.createServer(app);

new SocketController(server);
app.set('port', port);

const _clientFiles = '..' + ( (env === 'production') ? '/client/dist/' : '/client/dev/');


app.use(express.static(path.resolve(__dirname, _clientFiles)));
app.use(express.static(path.resolve(__dirname, '../node_modules')));
app.use(bodyParser.json());
app.use('/api', new BaseRoutes().routes);

let renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, _clientFiles + 'index.html'));
};

app.get('/*', renderIndex);

if (env === 'developement') {
    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response
    , next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app, server };
server.listen(app.get('port'), function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log('This express angular app is listening on port:' + port
        , 'Environement:' + env
        , 'host:' + host
        , 'files:' + _clientFiles);
});
