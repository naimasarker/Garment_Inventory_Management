const categoryRepo = require('../repositories/categoryRepository');

exports.getAllCategories = () => {
    return categoryRepo.findAll();
};

exports.addCategory = (name) => {
    return categoryRepo.insert(name);
};

exports.updateCategory = (id, name) => {
    return categoryRepo.update(id, name);
};

exports.deleteCategory = (id) => {
    return categoryRepo.delete(id);
};
