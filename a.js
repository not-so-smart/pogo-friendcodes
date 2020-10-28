const { User } = require('./models/Models');

async function run() {
    sequelize.authenticate()
        .then(async () => {
            console.log('Connected!');
            await User.sync();
            // await User.sync({force: true});
            console.log('Synced User model');

            await sequelize.close();
            console.log('Closed database connection');
        })
        .catch((e) => console.log(e));
}

run();