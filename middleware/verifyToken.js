const jwt = require('jsonwebtoken');
const returnData = require('../utils/returnData');

const verifyToken = async (req, res, next) => {
    const headers = req.headers.authorization;
    const accessToken = headers ? headers.split(' ')[1] : '';

    try {
        if (!accessToken) return returnData(res, null, 'Bạn không có quyền truy cập', 401);

        const verify = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (!verify) return returnData(res, null, 'Token không hợp lệ', 401);
        req.userId = verify.id;
        next();
    } catch (error) {
        return returnData(res);
    }
};

module.exports = verifyToken;