import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, SequelizeProvider } from 'discord-akairo';
import { join } from 'path';
import Settings from "./models/Settings";
import sequelize from './util/database';

declare module 'discord-akairo' {
    interface AkairoClient {
        settings: SequelizeProvider;
        commandHandler: CommandHandler;
        inhibitorHandler: InhibitorHandler;
        listenerHandler: ListenerHandler;
    }
}

export default class MyClient extends AkairoClient {

    constructor() {
        super({
            // Akairo options
            ownerID: '734540120329289840'
        }, {
            // d.js client options
            disableMentions: 'everyone'
        });

        this.settings = new SequelizeProvider(Settings, {
            idColumn: 'guild_id',
        });

        this.commandHandler = new CommandHandler(this, {
            // Command handler options
            directory: join(__dirname, 'commands'),
            prefix: message => {
                if (message.guild) return this.settings.get(message.guild.id, 'prefix', '/');
                return '/';
            },
            argumentDefaults: {
                prompt: {
                    modifyStart: (_msg, text, data) => `${text || 'Enter a value.'}\n\nOr, say \`cancel\` to stop.`,
                    modifyTimeout: (_msg, text, data) => `${text || 'Input prompt timed out.'}`,
                    modifyRetry: (_msg, text, data) => {
                        return `${data.retries < 3 ? (text || `${data.phrase} is not a valid input.`) : 'That doesn\'t work either.'}
                        \nTry again, or say \`cancel\` to stop.`;
                    },
                    modifyCancel: (_msg, text, data) => `${text || 'Command cancelled.'}`,
                    modifyEnded: (_msg, text, data) => `${text || 'Invalid input you suck at this bye'}`,
                    retries: 2
                }
            }
        });
        this.commandHandler.loadAll();

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: join(__dirname, 'inhibitors')
        });
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, 'listeners')
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });
        this.listenerHandler.loadAll();

    }

    async login(token: string) {
        await sequelize.sync(/* {force: true} */);
        await this.settings.init();
        console.log('init completed');
        return super.login(token);
    }
}
