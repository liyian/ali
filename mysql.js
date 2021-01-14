const configs = require('./config')


var mssql = require('knex') ({
    client:'mssql',
    connection: {
        host:configs.mysql.host,
        port:configs.mysql.port,
        user:configs.mysql.user,
        password:configs.mysql.pass,
        database:configs.mysql.db,
    }
})

var sql = require('knex') ({
    client:'mysql',
    connection: {
        host:configs.mysql.host,
        port:configs.mysql.port,
        user:configs.mysql.user,
        password:configs.mysql.pass,
        database:configs.mysql.db,
    }
})
module.exports = {mysql:sql,mssql:mssql}
