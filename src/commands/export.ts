import { Command } from "discord-akairo";
import { Message } from "discord.js";
import exportUsers from "../util/exportUsers";

export default class ExportCommand extends Command {
    constructor() {
        super('export', {
            aliases: ['export'],
            channel: 'guild',
            userPermissions: 'MANAGE_CHANNELS'
        })
    }

    async exec(message: Message) {
        return message.channel.send(await exportUsers(this.client));
    }
}