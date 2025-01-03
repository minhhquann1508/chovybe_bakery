const db = require('../configs/connectDb');

const Products = {};

Products.index = (callback) => {
    const sql = `SELECT p.*, c.category_id, c.category_name 
                FROM products p 
                INNER JOIN categories c ON p.category_id = c.category_id 
                WHERE p.is_deleted = 1`;
    db.query(sql, callback);
};

Products.show = (id, callback) => {
    const sql = `SELECT p.*, c.category_id, c.category_name 
                FROM products p 
                INNER JOIN categories c ON p.category_id = c.category_id 
                WHERE p.product_id = ? AND p.is_deleted = 1`;
    db.query(sql, [id], callback);
}

Products.create = (product, callback) => {
    const sql = 'INSERT INTO products SET ?';
    db.query(sql, [product], callback);
};

Products.edit = (id, product, callback) => {
    const sql = 'UPDATE products SET ? WHERE product_id = ?';
    db.query(sql, [product, id], callback);
};

Products.delete = (id, callback) => {
    const sql = 'UPDATE products SET is_deleted = 0 WHERE product_id = ?';
    db.query(sql, [id], callback);
};

module.exports = Products;


