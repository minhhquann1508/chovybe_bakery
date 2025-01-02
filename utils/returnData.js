const returnData = (res, data, message, status = 500) => {
    return res.status(status).json({
        success: status >= 200 && status < 300 ? true : false,
        message: message ?? 'Có lỗi xảy ra',
        data: data ?? []
    })
};

module.exports = returnData;