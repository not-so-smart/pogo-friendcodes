import { ok } from "assert";
import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import QR from "qrcode";
import User from "../models/User";
import createPlayerEmbed from "../util/createPlayerEmbed";
import { nameTypeCaster, codeTypeCaster } from "../util/typeCasters";

export default class RegisterCommand extends Command {
    constructor() {
        super('register', {
            aliases: ['register', 'reg', 'r'],
            channel: 'guild',
            args: [
                {
                    id: 'name',
                    description: 'The player\'s Pokemon GO username',
                    type: nameTypeCaster,
                    prompt: {
                        start: 'What\'s your username on Pokemon GO? Enter it exactly as it appears in the app.',
                        retry: 'Usernames must be 3 to 15 characters in length, and contain only letters and numbers.',
                    }
                },
                {
                    id: 'code',
                    description: 'The player\'s friend code',
                    type: codeTypeCaster,
                    match: 'rest',
                    prompt: {
                        start: 'Please copy and paste your 12-digit friend code.',
                    }
                }
            ]
        });
    }

    async exec(message: Message, args: { name: string; code: string; }) {
        ok(message.member && message.guild, 'This command must be run in a guild');
        // Find team
        const roles = message.member.roles.cache.filter((role) => ['MYSTIC', 'VALOR', 'INSTINCT'].includes(role.name.toUpperCase()));
        const role = roles.first();
        ok(role, 'I couldn\'t find your team! You must have a role with your team name in order to register.');
        const team = role.name.toUpperCase();
        const emoji = message.guild.emojis.cache.find((emoji) => emoji.name.toUpperCase() == team);
        ok(emoji, `I couldn't find an emoji named :${team}: to represent your team! Tell the mods to add one.`);
        // Check for existing user
        const user = await User.findByPk(args.code);
        if (user) // User already exists!
            return message.channel.send('This friend code is already registered in the database.\n\n' +
                `Username: ${user.username}\nFriend code: ${user.code}\nTeam: ${user.team_name}\nDiscord: <@${user.user_id}>`, { allowedMentions: { users: [] } });
        // Build new user
        const newUser = User.build({
            code: args.code,
            username: args.name,
            team_name: team,
            user_id: message.author.id,
        });
        const embed = await createPlayerEmbed({
            client: this.client,
            user: newUser,
        });
        const channelID = this.client.settings.get(message.guild.id, 'code_channel', null);
        const codeChannel = this.client.channels.cache.get(channelID);
        ok(codeChannel instanceof TextChannel, `The code channel for this guild is invalid. Tell an admin to set the code channel using \`/channel\`.`+
        `\nCurrent value: ${codeChannel}\nID: ${channelID}`);

        try {
            await newUser.save();
        } catch (e) {
            return message.channel.send(`Failed to save user data to database!\n\n` +
                `\`\`\`${e}\`\`\``
            )
        }

        let msg;
        try {
            msg = await codeChannel.send(embed)
            ok(msg instanceof Message, 'Tried to post more than one message for some reason.');
        } catch (e) {
            newUser.destroy();
            return message.channel.send(`Failed to post message in ${codeChannel}!\n\n` +
                `\`\`\`${e}\`\`\``
            );
        }

        newUser.message_id = msg.id;
        try {
            await newUser.save();
        } catch (e) {
            return message.channel.send(`Failed to save message data to database!\n\n` +
                `\`\`\`${e}\`\`\``
            )
        }

        return message.channel.send(`Successfully saved your information in ${codeChannel}. Use \`/print\` to view it.`);
    }
}