import { ok } from "assert";
import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import User from "../models/User";
import { codeTypeCaster } from "../util/typeCasters";

export default class DeleteCommand extends Command {
    constructor() {
        super('delete', {
            aliases: ['delete', 'del', 'd', 'remove', 'rm'],
            channel: 'guild',
            args: [
                {
                    id: 'code',
                    type: codeTypeCaster,
                    match: 'rest',
                    prompt: {
                        start: 'Please copy and paste the 12-digit friend code of the account you\'d like to remove.'
                    }
                },
                {
                    id: 'force',
                    match: 'flag',
                    flag: '--force',
                }
            ]
        })
    }

    async exec(message: Message, args: { code: string, force: boolean }) {
        ok(message.guild && message.member);
        const user = await User.findByPk(args.code);
        if (!user) return message.channel.send('I couldn\'t find an entry matching that friend code.');
        if (user.user_id != message.author.id && !message.member.hasPermission('MANAGE_CHANNELS'))
            return message.channel.send('You are not the owner of this account, and you don\'t have permission to manage it.');

        const channelID = this.client.settings.get(message.guild.id, 'code_channel', null);
        const codeChannel = this.client.channels.cache.get(channelID);
        ok(codeChannel instanceof TextChannel, `The code channel for this guild is invalid. ID: ${codeChannel} Current value: ${channelID}`);
        ok(user.message_id, 'User is not associated with a message ID');

        try {
            await (await codeChannel.messages.fetch(user.message_id)).delete();
        } catch (e) {
            if (!args.force) return message.channel.send('Failed to delete message!\n' +
                'Try again with `--force` if you want to remove the record from the database anyway.');
        }

        try {
            await user.destroy();
        } catch (e) {
            return message.channel.send(`Failed to delete user from database!`);
        }

        return message.channel.send(`Successfully deleted user.`);
    }
}