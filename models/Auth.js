const db = require('../configs/connectDb');
const bcrypt = require('bcryptjs');

const Auth = {};

Auth.register = (user, callback) => {
    const { email, password } = user;
    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailSql, [email], (err, result) => {
        if (err || result.length > 0) return callback({ message: 'Tài khoản đã được đăng ký', status: 400 });
        else {
            const salt = 10;
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) return callback({ message: 'Có lỗi xảy ra', status: 500 });

                const insertUserSql = 'INSERT INTO users SET ?';
                const newUser = { email, password: hashedPassword };
                db.query(insertUserSql, [newUser], (insertErr) => {
                    if (insertErr) return callback({ message: 'Đăng ký không thành công', status: 400 });
                    return callback();
                });
            });
        }
    })
};

Auth.login = (email, password, callback) => {
    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailSql, [email], (err, result) => {
        if (err || result.length === 0) return callback({ message: 'Tài khoản không tồn tại', status: 401 });
        else {
            const hashedPassword = result[0].password;
            bcrypt.compare(password, hashedPassword, (compareErr, isMatch) => {
                if (compareErr) return callback({ message: 'Có lỗi xảy ra', status: 500 });
                if (!isMatch) return callback({ message: 'Mật khẩu hoặc email không đúng', status: 401 });
                return callback({ data: result[0], message: 'Đăng nhập thành công', status: 200 })
            });
        }
    })
}

module.exports = Auth;