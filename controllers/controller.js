
const service = require('../services/service');
const constants = require('../constants/constants');

exports.createEvent = createEvent;
exports.getEvents = getEvents;

async function createEvent(req, res) {
  try {
    const name = req.body.name;
    const startTime = new Date(req.body.start_time);
    const duration = req.body.duration;

    const result = await service.insertEvent({
      name,
      start_time: startTime,
      duration,
    });

    if (!result) {
      logger.info("Event Not created");
      return constants.sendResponse(res, constants.RESPONSE_MESSAGES.SOMETHING_WENT_WRONG, constants.RESPONSE_FLAGS.SOMETHING_WENT_WRONG);
    }

    logger.info(`Event Successfuly created : ${result && result.id}`);
    return constants.sendResponse(res, constants.RESPONSE_MESSAGES.SUCCESS, constants.RESPONSE_FLAGS.SUCCESS, result);

  } catch (error) {
    logger.error(error);
    return constants.sendResponse(res, constants.RESPONSE_MESSAGES.SOMETHING_WENT_WRONG, constants.RESPONSE_FLAGS.SOMETHING_WENT_WRONG);
  }
}

async function getEvents(req, res) {
  try {
    const limit = req.query.limit && parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    const skip = req.query.skip && parseInt(req.query.skip) ? parseInt(req.query.skip) : 0;

    const liveResult = await service.getLiveEvents({ limit, skip });
    if (!liveResult) {
      logger.info("No Live Events found");
    }

    const upcomingResult = await service.getUpcomingEvents({ limit, skip });
    if (!upcomingResult) {
      logger.info("No Upcoming Events found");
    }

    logger.info('Events Fetched Successfuly');
    return constants.sendResponse(res, constants.RESPONSE_MESSAGES.SUCCESS, constants.RESPONSE_FLAGS.SUCCESS, {
      live_events: liveResult || [],
      upcoming_events: upcomingResult || []
    });

  } catch (error) {
    logger.error(error);
    return constants.sendResponse(res, constants.RESPONSE_MESSAGES.SOMETHING_WENT_WRONG, constants.RESPONSE_FLAGS.SOMETHING_WENT_WRONG);
  }
}
