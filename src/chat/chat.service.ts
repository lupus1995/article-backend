import {Injectable} from '@nestjs/common';

interface UsersChatInterface {
    id: string;
    name: string;
    room: string;
}

@Injectable()
export class ChatService {

    private users: UsersChatInterface[] = [];

    addUser({id, name, room}: UsersChatInterface) {
        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();
        console.log(this.users.filter((user) => {
            return user.room === room && user.name === name;
        }));
        const existingUser = this.users.find((user) => {
            return user.room === room && user.name === name;
        });
        if (existingUser) {
            return {error: 'Username is taken'};
        }
        const newUser = {id, name, room};

        this.users.push(newUser);
        return {newUser};
    }

    removeUser(id) {
        const index = this.users.findIndex((user) => user.id === id);

        if (index !== -1) {
            return this.users.splice(index, 1)[0];
        }
    }

    getUser(id) {
        return this.users.find((user) => user.id === id);
    }

    getUsersInRoom(room) {
        return this.users.filter((user) => user.room === room);
    }

    getAllUsers() {
        return this.users;
    }

}
