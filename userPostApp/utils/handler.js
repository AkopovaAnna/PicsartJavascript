const errorHandler = (err, req, res, statusCode) => {

    if (err.message.includes('{')) {
        err.message = JSON.parse(err.message)
    }
    res.status(statusCode).json({
        success: false,

        error: err.message
    })
};

const successHandler = (data, req, res) => {
    res.status(200).json({
        success: true,
        data: data
    })
};

module.exports = {
    errorHandler: errorHandler,
    successHandler: successHandler
}

