import { Command, Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    exec(message: Message, command: Command, reason: string) {
        console.log(`${message.author.username} was blocked from using ${command.id} because of ${reason}`);
    }
}