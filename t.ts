import { ok } from 'assert';
import { Client, MessageEmbedOptions, TextChannel } from 'discord.js';
const client = new Client();

client.once('ready', async () => {
    const channel = client.channels.cache.get('765726263582261298');
    const embed: MessageEmbedOptions = {
        author: {
            name: 'TonyZaret',
            icon_url: 'https://cdn.discordapp.com/emojis/367041971321307136.png'
        },
        title: '1234 5678 9012',
        description: '<@215552420862885888>',
        footer: {
            text: 'Mobile users: Tap+Hold the friend code to copy',
            icon_url: 'https://cdn.discordapp.com/emojis/367041971321307136.png'
        },
        thumbnail: {
            url: 'https://cdn.discordapp.com/avatars/209502542764179483/160ccc3d210989ea458c6ceb8552c7b4.png?size=2048'
        },
        image: {
            url: 'https://cdn.discordapp.com/attachments/765726263582261298/769290595910680596/123456789012.png'
        },
    };
    ok(channel instanceof TextChannel);
    await channel.send({
        //content: '`123456789012`',
        embed: embed
    });
    process.exit();
});


client.login('NzY1OTkwMzI5MjM2MTkzMzIx.X4c2FQ.QFJlCjiU2ItmOUXUdKxEOek3U-0');