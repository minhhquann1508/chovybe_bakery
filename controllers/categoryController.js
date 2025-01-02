const Categories = require('../models/Categories');
const returnData = require('../utils/returnData');
const controller = {};

controller.getAllCategories = (req, res) => {
    Categories.index((err, categories) => {
        if (err) return returnData(res, err, err.message);
        return returnData(res, categories, 'Lấy danh sách danh mục thành công', 200);
    })
};

controller.getCategoryById = (req, res) => {
    const { id } = req.params;
    if (!id) return returnData(res, null, 'Không tìm thấy id', 404);
    Categories.show(id, (err, category) => {
        if (err) return returnData(res, err, err.message);
        //Nếu không có danh mục nào cả
        if (!category || category.length === 0) return returnData(res, [], 'Không tìm thấy danh mục', 404);
        return returnData(res, category, 'Lấy danh mục thành công', 200);
    });
}

controller.createCategory = (req, res) => {
    const { category_name, category_desc } = req.body;
    if (!category_name || !category_desc) return returnData(res, null, 'Vui lòng nhập đủ thông tin', 400);
    const category = { ...req.body, category_name, category_desc };
    Categories.create(category, (err, result) => {
        if (err) return returnData(res, err, err.message);
        // Lấy sản phẩm mới thêm
        const { insertId } = result;
        Categories.show(insertId, (err, category) => {
            if (err) return returnData(res, err, err.message);
            return returnData(res, category, 'Tạo danh mục thành công', 201);
        })
    });
};

controller.updateCategory = (req, res) => {
    const { id } = req.params;
    const { category_name, category_desc } = req.body;
    if (!id || !category_name || !category_desc) return returnData(res, null, 'Vui lòng nhập đủ thông tin', 400);
    const category = { category_id: id, ...req.body, category_name, category_desc };
    Categories.edit(id, category, (err) => {
        if (err) return returnData(res, err, err.message);
        Categories.show(id, (err, category) => {
            if (err) return returnData(res, err, err.message);
            return returnData(res, category, 'Chỉnh sửa danh mục thành công', 200);
        })
    })
};

controller.deleteCategory = (req, res) => {
    const { id } = req.params;
    if (!id) return returnData(res, null, 'Không tìm thấy id', 400);
    Categories.delete(id, (err, result) => {
        if (err) return returnData(res, err, err.message);
        //Kiểm tra có danh mục trong db không nếu không trả lỗi
        if (result.affectedRows < 1) return returnData(res, null, 'Không tìm thấy danh mục cần xoá', 404);
        return returnData(res, null, 'Xóa danh mục thành công', 200);
    })
}

module.exports = controller;