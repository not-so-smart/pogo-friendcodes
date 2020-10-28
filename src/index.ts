import MyClient from "./client";
import { join } from 'path';
require('dotenv').config({ path: join(__dirname,'../.env') });

const client = new MyClient();
const token = process.env.DISCORD_TOKEN;
if (!token) throw new Error("Could not find token in process.env.DISCORD_TOKEN");

client.login(token);