import { ok } from 'assert';
import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";

export default class SetChannelCommand extends Command {
    constructor() {
        super('setchannel', {
            aliases: ['setchannel', 'channel', 'channelset', 'sc'],
            userPermissions: 'MANAGE_CHANNELS',
            channel: 'guild',
            args: [
                {
                    id: 'channel',
                    type: 'textChannel',
                    prompt: {
                        start: 'Which channel would you like to store codes in?'
                    }
                }
            ]
        });
    }

    async exec(message: Message, args: { channel: TextChannel }) {
        ok(message.member && message.guild, 'This command must be run in a guild');
        try {
            await this.client.settings.set(message.guild.id, 'code_channel', args.channel.id);
        } catch (e) {
            console.error(e);
            return message.channel.send('Failed to set code channel!');
        }
        return message.channel.send(`Successfully set code channel to ${args.channel}.\n` +
            `Note that any messages previously posted in the old code channel may become invalid.`);
    }
}