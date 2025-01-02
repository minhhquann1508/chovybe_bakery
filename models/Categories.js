const db = require('../configs/connectDb');

const Categories = {};

Categories.index = (callback) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, callback);
};

Categories.show = (id, callback) => {
    const sql = 'SELECT * FROM categories WHERE category_id = ?';
    db.query(sql, [id], callback);
}

Categories.create = (category, callback) => {
    const sql = 'INSERT INTO categories SET ?';
    db.query(sql, [category], callback);
};

Categories.edit = (id, category, callback) => {
    const sql = 'UPDATE categories SET ? WHERE category_id = ?';
    db.query(sql, [category, id], callback);
};

Categories.delete = (id, callback) => {
    const sql = 'DELETE FROM categories WHERE category_id = ?';
    db.query(sql, [id], callback);
};

module.exports = Categories;


