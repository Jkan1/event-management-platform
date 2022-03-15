
exports.RESPONSE_FLAGS = {
    SUCCESS : 200,
    PARAMETER_MISSING: 400,
    NOT_FOUND : 404,
    SOMETHING_WENT_WRONG : 500
}

exports.RESPONSE_MESSAGES = {
    SUCCESS : "Success",
    PARAMETER_MISSING : "Parameters missing",
    NOT_FOUND : "Not Found",
    SOMETHING_WENT_WRONG : "Something went wrong",
}

exports.sendResponse = (res, message, code, data) => {
    const responseObject = {
        code: code,
        message: message,
        data: data || {}
    }
    res.send(responseObject)
}
