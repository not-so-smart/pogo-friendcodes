import { MessageEmbedOptions, MessageOptions } from "discord.js";
import { toBuffer } from "qrcode";
import MyClient from "../client";
import User from "../models/User";

export default async function createPlayerEmbed({ user, client, simple }: { user: User; client: MyClient; simple?: boolean }): Promise<MessageOptions> {
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
            content: `\`\`\`js\n${user.pretty_code}\`\`\``,
            embed: embed,
        }
    }

    const embed: MessageEmbedOptions = {
        author: {
            name: user.username,
            icon_url: user.team.icon
        },
        title: user.pretty_code,
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
