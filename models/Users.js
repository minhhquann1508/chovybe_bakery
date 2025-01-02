const db = require('../configs/connectDb');

const Users = {};

Users.index = (callback) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, callback);
};

Users.show = (userId, callback) => {
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    db.query(sql, [userId], callback);
};

Users.create = (user, callback) => {
    const sql = 'INSERT INTO users SET ?, role = 1';
    db.query(sql, [user], callback);
};

User.update = (user, callback) => {
    const sql = 'UPDATE users SET ? WHERE user_id = ?';
    db.query(sql, [user, user.user_id], callback);
};

Users.delete = (userId, callback) => {
    const sql = 'DELETE FROM users WHERE user_id = ?';
    db.query(sql, [userId], callback);
};

module.exports = Users;