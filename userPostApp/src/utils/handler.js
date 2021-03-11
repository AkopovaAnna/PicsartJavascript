exports.errorHandler = (err, req, res, statusCode) => {

    if (err.message.startsWith('{')) {
        err.message = JSON.parse(err.message)
    }
    res.status(statusCode).json({
        success: false,
        error: err.message
    })
};

exports.successHandler = (data, req, res) => {
    res.status(200).json({
        success: true,
        data: data
    })
};
