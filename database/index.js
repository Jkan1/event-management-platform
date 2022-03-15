"use strict";

const mysql = require('mysql');

const dbConfig = {
  host: config.get('databaseSettings.host'),
  user: process.env.MYSQL_USER || config.get('databaseSettings.user'),
  password: process.env.MYSQL_PASS || config.get('databaseSettings.password'),
  database: config.get('databaseSettings.database'),
  port: config.get('databaseSettings.port')
};

(function handleDisconnect() {
  global.connection = mysql.createConnection(dbConfig);
  //Recreation Of connection when server is either down or restarting (takes a while sometimes).
  connection.connect(function (err) {
    if (err) {
      logger.error({ origin: "MYSQL SERVICE", event: "Error when connecting to MYSQL database!!", message: err });
      // We introduce a delay before attempting to reconnect to avoid a hot loop
      setTimeout(handleDisconnect, 2000);
    } else {
      logger.info({ origin: "MYSQL SERVICE", event: "MySQL connection established!!" });
    }
  });
  connection.on('error', function (err) {
    logger.error({ origin: "MYSQL SERVICE", event: "Some disconnection with MYSQL database!!", message: { error: err } });
    // Connection to the MySQL server is usually lost due to either server restart, or a connection idle timeout
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
})();
