import * as socketio from 'socket.io';
import CardModel = require('../app/model/CardModel');
import UserModel = require('../app/model/UserModel');

export default class SocketController {
    io: SocketIO.Server;
    private static _instance: SocketController;

    public static getInstance(): SocketController {
        return SocketController._instance;
    }

    constructor(server: any) {
        this.io = socketio(server);
        this.io.on('connection', this.connectionHandler);
        SocketController._instance = this;
    }

    private connectionHandler(socket: SocketIO.Socket) {
        socket.on('join_room', (values) => {
            SocketController._instance.joinRoom(socket, values);
            socket.on('disconnect',
                () => SocketController._instance.disconnectFromRoom(values.roomId, values.userId));
        });
    }

    private joinRoom(socket: SocketIO.Socket, values: any) {
        socket.join(values.roomId);
    }

    public disconnectFromRoom(roomId: string, userId: string) {
        this.io.to(roomId).emit('user_disconnect', userId);
    }

    public addUser(roomId: string, user: UserModel) {
        this.io.to(roomId).emit('new_user', user);
    }

    public upsertCard(roomId: string, card: CardModel) {
        this.io.to(roomId).emit('upsert_card', card);
    }
}
