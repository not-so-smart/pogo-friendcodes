import { MessageEmbedOptions, MessageOptions } from "discord.js";
import { toBuffer } from "qrcode";
import MyClient from "../client";
import User from "../models/User";

export default async function createPlayerEmbed({ user, client }: { user: User; client: MyClient; }): Promise<MessageOptions> {
    const prettyCode = `${user.code.substr(0, 4)} ${user.code.substr(4, 4)} ${user.code.substr(8, 4)}`;
    const qrBuffer = await toBuffer(user.code);
    const avatar = (await client.users.fetch(user.user_id)).displayAvatarURL();

    const embed: MessageEmbedOptions = {
        author: {
            name: user.username,
            icon_url: user.team.icon
        },
        title: prettyCode,
        description: `<@${user.user_id}>`,
        footer: {
            text: 'Mobile users: Tap+Hold the friend code to copy',
            icon_url: user.team.icon
        },
        thumbnail: {
            url: avatar
        },
        image: { url: `attachment://${user.code}.png` },
        color: user.team.color
    };

    return {
        // content: `${prettyCode}`,
        embed: embed,
        files: [{
            attachment: qrBuffer,
            name: `${user.code}.png`
        }],
    };

}
