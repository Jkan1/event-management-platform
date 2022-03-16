
exports.executeQuery = executeQuery;

function executeQuery(sql, params) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, function (err, result) {
            logger.info(`Executing SQL : ${sql} , PARAMS : ${params}`);
            if (err) {
                return reject(err);
            }
            logger.info(`SQL RESULT : `, result)
            return resolve(result);
        });
    });
}
