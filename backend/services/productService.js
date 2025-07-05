const productRepo = require('../repositories/productRepository');

exports.getAllProducts = () => {
    return productRepo.findAllWithVariants();
};

exports.addProduct = async (productData) => {
    const { name, category_id, sku, variants } = productData;
    const productId = await productRepo.insertProduct({ name, category_id, sku });

    if (variants && variants.length > 0) {
        await productRepo.insertVariants(productId, variants);
    }

    return { id: productId, name, category_id, sku, variants };
};

exports.updateProduct = async (productId, productData) => {
    const { name, category_id, sku, variants } = productData;
    await productRepo.updateProduct(productId, { name, category_id, sku });

    if (variants && variants.length > 0) {
        await productRepo.replaceVariants(productId, variants);
    }

    return { id: productId, name, category_id, sku, variants };
};

exports.deleteProduct = async (productId) => {
    await productRepo.deleteVariants(productId);
    await productRepo.deleteProduct(productId);
};
