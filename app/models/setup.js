const config = require('../config/db.config');
const path = require('path');
const dirPath = path.join(__dirname, '../migrations');

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : config.HOST,
      port : config.PORT,
      user : config.USER,
      password : config.PASSWORD,
      database : config.DB
    }
});
const migrationConfig = {
    directory: dirPath,
};

function runMigrations() {
    knex.migrate.latest(migrationConfig).then(([batchNo, log]) => {
        if (!log.length) {
            console.info('Database is already up to date');
        } else {
            console.info('Ran migrations: ' + log.join(', '));
        }
    
        // Important to destroy the database, otherwise Node script won't exit
        // because Knex keeps open handles.
        knex.destroy();
    });
}

module.exports = {
    runMigrations: runMigrations
}




