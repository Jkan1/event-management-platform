
exports.RESPONSE_FLAGS = {
    SUCCESS : 200,
    NOT_FOUND : 404,
    SOMETHING_WENT_WRONG : 500,
}

exports.RESPONSE_MESSAGES = {
    SUCCESS : "Success",
    NOT_FOUND : "Not Found",
    SOMETHING_WENT_WRONG : "Something went wrong",
    PARAMETER_MISSING : "Parameters missing",
}

exports.sendResponse = (res, message, code, data) => {
    const responseObject = {
        code: code,
        message: message,
        data: data || {}
    }
    res.send(responseObject)
}
