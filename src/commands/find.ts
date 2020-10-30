import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Sequelize } from "sequelize";
import User from "../models/User";
import createPlayerEmbed from "../util/createPlayerEmbed";
import { codeTypeCaster, nameTypeCaster } from "../util/typeCasters";

export default class LookupCommand extends Command {
    constructor() {
        super('find', {
            aliases: ['find', 'f', 'list', 'ls', 'show', 'print', 'p', 'whois', 'who', 'whom', 'whomst'],
            args: [
                {
                    id: 'query',
                    type: 'string',
                    // type: Argument.union('userMention', codeTypeCaster, nameTypeCaster),
                    match: 'rest'
                },
                {
                    id: 'codeOnly',
                    match: 'flag',
                    flag: ['-c', '--code', '--copy', '--numeric']
                }
            ]
        });
    }

    async exec(message: Message, args: { query: string | null, codeOnly: boolean }) {
        let type: string = '';
        async function getUsers(): Promise<User[]> {
            if (!args.query) {
                type = 'self'
                return User.findAll({ where: { user_id: message.author.id } });
            }
            if (codeTypeCaster(message, args.query) != null) {
                type = 'friend code'
                const user = await User.findByPk(args.query);
                if (user) return [user];
                return [];
            }
            if (nameTypeCaster(message, args.query) != null) {
                type = 'Pokemon GO username'
                return User.findAll({ where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('username')), args.query.toLowerCase()) });
            }
            const matches = args.query ? args.query.match(/<@!?(\d{17,19})>/) : null;
            if (matches) {
                type = 'discord user'
                return User.findAll({ where: { user_id: matches[1] } });
            }
            return [];
        }

        const users = await getUsers();
        if (!users.length) {
            if (!type)
                return message.channel.send(`I can't tell what \`${args.query}\` is supposed to be.\n` +
                    'Try again with a valid Pokemon GO username, friend code, or @user.\n' +
                    'Or, just enter the command by itself with no arguments to see your own profile.');
            if (type == 'self')
                return message.channel.send('I couldn\'t find an entry associated with your discord account.\n' +
                    'Add your name to the list by using the \`/register\` command.');
            return message.channel.send(`I couldn't find that ${type} in the database.`);
        }

        const promises = new Array<Promise<Message | Message[]>>();
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (args.codeOnly) promises.push(
                message.channel.send(
                    await createPlayerEmbed({
                        client: this.client,
                        user: user,
                        simple: true
                    })
                )
            );
            else promises.push(
                message.channel.send(
                    await createPlayerEmbed({
                        client: this.client,
                        user: user,
                    })
                )
            );
        }

        return Promise.all(promises);
    }
}