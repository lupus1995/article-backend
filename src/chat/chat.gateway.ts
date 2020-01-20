import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WsResponse,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';
import {Logger} from '@nestjs/common';
import {ChatService} from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private readonly chatService: ChatService) {
    }

    handleConnection(client: Socket, ...args: any[]): any {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any): any {
        const user = this.chatService.removeUser(client.id);
        if (user) {
            this.logger.log(`Client disconnected: ${client.id}`);
            client.broadcast.emit('message', {user: 'admin', text: `${user.name}, has left!`});
            client.leave(user.room);
        }
    }

    private logger: Logger = new Logger('ChatGateway');

    afterInit(server: Server): any {
        this.logger.log('Initialized!');
    }

    @SubscribeMessage('customDisconnect')
    handleCustomDisconnect(client: Socket): void {
        const user = this.chatService.removeUser(client.id);
        client.broadcast.emit('message', {user: 'admin', text: `${user.name}, has left!`});
        client.leave(user.room);
        // client.emit('msgToClient', text);
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text: string): void {
        client.emit('msgToClient', text);
    }

    @SubscribeMessage('join')
    handleJoin(client: Socket, data: { name: string, room: string }): any {
        const {name, room} = data;
        const {error, newUser} = this.chatService.addUser({id: client.id, name, room});
        if (error) {
            return error;
        }
        client.join(room);
        client.emit('message', {user: 'admin', text: `${newUser.name}, welcome to the room ${newUser.room}`});
        client.broadcast.to(room).emit('message', {user: 'admin', text: `${newUser.name}, has joined!`});
        // client.emit('msgToClient', text);
    }

    @SubscribeMessage('sendMessage')
    handleSendMessage(client: Socket, message) {
        const user = this.chatService.getUser(client.id);
        client.broadcast.to(user.room).emit('message', {user: user.name, text: message});
    }

}
