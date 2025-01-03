const Products = require('../models/Products');
const returnData = require('../utils/returnData');

const controller = {};

controller.getAllProducts = (req, res) => {
    Products.index((err, products) => {
        if (err) return returnData(res, err, err.message);
        return returnData(res, products, 'Lấy danh sách sản phẩm thành công', 200);
    })
};

controller.getProductById = (req, res) => {
    const { id } = req.params;
    if (!id) return returnData(res, null, 'Không tìm thấy id sản phẩm', 400);
    Products.show(id, (err, product) => {
        if (err) return returnData(res, err, err.message);
        if (!product || product.length === 0) return returnData(res, [], 'Không tìm thấy sản phẩm', 404);
        return returnData(res, product, 'Lấy chi tiết sản phẩm thành công', 200);
    });
};

controller.createNewProduct = (req, res) => {
    const { product_name, sub_desc } = req.body;
    if (!product_name || !sub_desc) return returnData(res, null, 'Vui lòng điền đủ thông tin', 400);
    Products.create({ ...req.body }, (err, result) => {
        if (err) return returnData(res, err, err.message);
        const { insertId } = result;
        Products.show(insertId, (err, product) => {
            if (err) return returnData(res, err, err.message);
            return returnData(res, product, 'Thêm mới sản phẩm thành công', 201);
        })
    })
};

controller.updateProduct = (req, res) => {
    const { id } = req.params;
    const { product_name, sub_desc } = req.body;
    if (!id) return returnData(res, null, 'Không tìm thấy id sản phẩm', 400);
    if (!product_name || !sub_desc) return returnData(res, null, 'Vui lòng điền đủ thông tin', 400);
    const product = { product_id: id, ...req.body };
    Products.edit(id, product, (err) => {
        if (err) return returnData(res, err, err.message);
        Products.show(id, (err, product) => {
            if (err) return returnData(res, err, err.message);
            return returnData(res, product, 'Cập nhật sản phẩm thành công', 200);
        });
    });
};

controller.deleteProduct = (req, res) => {
    const { id } = req.params;
    if (!id) return returnData(res, null, 'Không tìm thấy id sản phẩm', 400);
    Products.delete(id, (err) => {
        if (err) return returnData(res, err, err.message);
        return returnData(res, null, 'Xóa sản phẩm thành công', 200);
    });
};

module.exports = controller