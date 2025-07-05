const stockRepo = require('../repositories/stockRepository');
const productRepo = require('../repositories/productRepository');

exports.recordTransaction = async (data, userId) => {
    const { variant_id, transaction_type, quantity, remarks } = data;

    if (!variant_id || !transaction_type || !quantity) {
        throw new Error("All required fields must be provided.");
    }

    // Step 1: Add transaction
    await stockRepo.insertTransaction({
        variant_id,
        transaction_type,
        quantity,
        performed_by: userId,
        remarks,
    });

    // Step 2: Update product variant quantity
    const variant = await stockRepo.getVariantById(variant_id);

    if (!variant) throw new Error("Product variant not found.");

    const newQty = transaction_type === 'in'
        ? variant.quantity + quantity
        : variant.quantity - quantity;

    if (newQty < 0) throw new Error("Stock quantity cannot be negative!");

    await stockRepo.updateVariantQuantity(variant_id, newQty);

    return {
        variant_id,
        transaction_type,
        quantity,
        performed_by: userId,
        new_quantity: newQty
    };
};

exports.getAllTransactions = () => {
    return stockRepo.findAllWithJoins();
};
