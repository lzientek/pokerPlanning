import * as socketio from 'socket.io';
import CardModel = require('../app/model/CardModel');
import UserModel = require('../app/model/UserModel');
import VoteResult = require('../app/model/VoteResult');
import RoomBusiness = require('../app/business/RoomBusiness');

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
        socket.on('join_room', (values: {roomId: string, userId: string}) => {
            SocketController._instance.joinRoom(socket, values);
            const roomBusiness = new RoomBusiness();
            roomBusiness.reactiveUser(values.roomId, values.userId, err => console.error(err));
            SocketController._instance.activateUser(values.roomId, values.userId);
            socket.on('disconnect',
                () => SocketController._instance.disconnectFromRoom(values.roomId, values.userId));
        });
    }

    private joinRoom(socket: SocketIO.Socket, values: any) {
        socket.join(values.roomId);
    }

    public disconnectFromRoom(roomId: string, userId: string) {
        this.io.to(roomId).emit('user_disconnect', userId);
        const roomBusiness = new RoomBusiness();
        roomBusiness.removeUser(roomId, userId, err => console.error(err));
    }

    public addUser(roomId: string, user: UserModel) {
        this.io.to(roomId).emit('new_user', user);
    }

    public activateUser(roomId: string, userId: string) {
        this.io.to(roomId).emit('activate_user', userId);
    }

    public upsertCard(roomId: string, card: CardModel) {
        this.io.to(roomId).emit('upsert_card', card);
    }

    public addVote(roomId: string, vote: VoteResult) {
        this.io.to(roomId).emit('new_vote', vote);
    }
}
