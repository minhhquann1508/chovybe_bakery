const db = require('../configs/connectDb');

const Address = {};

Address.getAdressByUserId = (userId, callback) => {
    const sql = 'SELECT * FROM address WHERE user_id = ?';
    db.query(sql, [userId], callback);
};

Address.createNewAddress = (address, callback) => {
    const sql = 'INSERT INTO address SET ?';
    db.query(sql, [address], callback);
};

Address.updateAddress = (address, callback) => {
    const sql = 'UPDATE address SET ? WHERE id = ?';
    db.query(sql, [address, address.address_id], callback);
};

Address.deleteAddress = (addressId, callback) => {
    const sql = 'DELETE FROM address WHERE address_id = ?'
    db.query(sql, [addressId], callback);
};

module.exports = Address;