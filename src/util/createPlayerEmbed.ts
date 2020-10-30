import { MessageEmbedOptions, MessageOptions } from "discord.js";
import { toBuffer } from "qrcode";
import MyClient from "../client";
import User from "../models/User";

export default async function createPlayerEmbed({ user, client, simple }: { user: User; client: MyClient; simple?: boolean }): Promise<MessageOptions> {
    const prettyCode = `${user.code.substr(0, 4)} ${user.code.substr(4, 4)} ${user.code.substr(8, 4)}`;
    const qrBuffer = await toBuffer(user.code);
    const avatar = (await client.users.fetch(user.user_id)).displayAvatarURL();

    if (simple) {
        const embed: MessageEmbedOptions = {
            author: {
                name: user.username,
                icon_url: avatar,
            },
            color: user.team.color
        };

        return {
            content: `\`\`\`js\n${prettyCode}\`\`\``,
            embed: embed,
        }
    }

    const embed: MessageEmbedOptions = {
        author: {
            name: user.username,
            icon_url: user.team.icon
        },
        title: prettyCode,
        description: `<@${user.user_id}>`,
        footer: {
            text: `To copy this code on mobile: /p ${user.username} -c`,
            icon_url: user.team.icon
        },
        thumbnail: {
            url: avatar
        },
        image: { url: `attachment://${user.code}.png` },
        color: user.team.color
    };

    return {
        embed: embed,
        files: [{
            attachment: qrBuffer,
            name: `${user.code}.png`
        }],
    };

}
