import { Command, Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class CommandErrorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    exec(error: Error, message: Message, command?: Command) {
        if (error.name == 'AssertionError') return message.channel.send(`⛔ ${error.message}`);
        else return message.channel.send(`⛔ An error occurred.\n\`\`\`${error}\`\`\``);
    }
}