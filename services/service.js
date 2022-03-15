const constants = require('../constants/constants');

exports.insertEvent = insertEvent;
exports.getUpcomingEvents = getUpcomingEvents;
exports.getLiveEvents = getLiveEvents;

async function insertEvent(data) {
    try {
        logger.info("Inserting Event in DB");

        const sql = 'INSERT INTO tb_events (name, start_time, duration) VALUES (?, ?, ?)';
        const params = [data.name, data.start_time, data.duration];

        const result = await connection.query(sql, params);
        if (result && result.insertId)
            return { id: result.insertId };

    } catch (error) {
        logger.error(error);
        return null;
    }
}

async function getUpcomingEvents(data) {
    try {
        logger.info("Inserting Event in DB");

        let sql = 'SELECT * FROM tb_events WHERE is_deleted = 0 AND start_time > NOW()';
        let params = [];

        if (data.limit || data.skip) {
            sql += ' LIMIT ?, ?'
            params.push(data.skip, data.limit)
        }

        const result = await connection.query(sql, params);
        if (result && result.length)
            return result
    } catch (error) {
        logger.error(error);
        return null;
    }
}

async function getLiveEvents(data) {
    try {
        logger.info("Inserting Event in DB");

        let sql = 'SELECT * FROM tb_events WHERE is_deleted = 0 AND start_time < NOW() AND DATE_ADD(start_time, INTERVAL duration MINUTE) >= NOW()';
        let params = [];

        if (data.limit || data.skip) {
            sql += ' LIMIT ?, ?'
            params.push(data.skip, data.limit)
        }

        const result = await connection.query(sql, params);
        if (result && result.length)
            return result
    } catch (error) {
        logger.error(error);
        return null;
    }
}

