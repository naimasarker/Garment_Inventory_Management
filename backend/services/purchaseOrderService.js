const purchaseRepo = require('../repositories/purchaseOrderRepository');

exports.createOrder = async (data, userId) => {
    const { po_number, items } = data;

    if (!po_number || !items || items.length === 0) {
        throw new Error('PO number and items are required');
    }

    const orderId = await purchaseRepo.insertOrder(po_number, userId);
    await purchaseRepo.insertItems(orderId, items);

    return { orderId, message: 'Purchase order created successfully' };
};

exports.getAllOrders = () => {
    return purchaseRepo.findAllOrders();
};

exports.updateOrderStatus = async (id, status) => {
    const valid = ['pending', 'approved', 'received'];
    if (!valid.includes(status)) throw new Error('Invalid status');
    return purchaseRepo.updateOrderStatus(id, status);
};
