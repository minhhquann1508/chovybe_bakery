const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');
const returnData = require('../utils/returnData');
const controller = {};

controller.register = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return returnData(res, null, 'Vui lòng điền đầy đủ thông tin', 400);
    Auth.register({ ...req.body }, (err) => {
        if (err) return returnData(res, null, err.message, err.status);
        return returnData(res, null, 'Đăng ký thành công', 201);
    })
};

controller.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return returnData(res, null, 'Vui lòng điền đầy đủ thông tin', 400);
    Auth.login(email, password, (result) => {
        if (!result.data) return returnData(res, null, result.message, result.status);
        const { data, message, status } = result;
        const accessToken = jwt.sign(
            { id: data.user_id, role: data.role },
            process.env.JWT_SECRET,
        );
        const { password, ...user } = data;
        return returnData(res, { ...user, token: accessToken }, message, status);
    });
};
module.exports = controller;