import { MessageOptions, FileOptions } from "discord.js";
import stringify from "csv-stringify/lib/sync";
import User from "../models/User";
import MyClient from "../client";

export default async function exportUsers(client: MyClient): Promise<MessageOptions> {
    const users = await User.findAll();
    const data = [['Friend code', 'Username', 'Team name', 'Discord tag', 'Discord user ID']]
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const tag = (await client.users.fetch(user.user_id)).tag;
        data.push([user.pretty_code, user.username, user.team_name, tag, user.user_id]);
    }
    const string = stringify(data);
    const options: FileOptions = {
        attachment: Buffer.from(string),
        name: 'users.csv'
    }
    return {
        files: [options],
    }
}