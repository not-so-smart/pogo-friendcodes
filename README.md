# pogo-friendcodes
Pokemon GO friendcode management utility for Discord.

If you'd like to run this utility on your server, download this repository into a folder, install [node.js](https://nodejs.org/) and make a new bot application at [discord.com/developers](https://discord.com/developers).

Create a file in the pogo-friendcodes folder called `.env` containing this line:

    DISCORD_TOKEN='your token here between quotes'

Then open a command window and run the following commands.

Install dependencies:

    npm i

Compile code:

    npx tsc

Move into build folder:

    cd build

Run:

    node index
