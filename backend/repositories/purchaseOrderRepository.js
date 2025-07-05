const db = require('../config/db');

exports.insertOrder = (po_number, created_by) => {
    return new Promise((resolve, reject) => {
        const q = `INSERT INTO purchase_orders (po_number, created_by) VALUES (?, ?)`;
        db.query(q, [po_number, created_by], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

exports.insertItems = (orderId, items) => {
    const values = items.map(i => [orderId, i.variant_id, i.quantity]);
    const q = `INSERT INTO purchase_order_items (purchase_order_id, variant_id, quantity) VALUES ?`;

    return new Promise((resolve, reject) => {
        db.query(q, [values], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

exports.findAllOrders = () => {
    const q = `
        SELECT 
            po.id AS order_id, po.po_number, po.status, po.created_at,
            u.name AS created_by,
            p.name AS product_name,
            pv.size, pv.color,
            poi.quantity
        FROM purchase_orders po
        JOIN users u ON po.created_by = u.id
        JOIN purchase_order_items poi ON poi.purchase_order_id = po.id
        JOIN product_variants pv ON poi.variant_id = pv.id
        JOIN products p ON pv.product_id = p.id
        ORDER BY po.created_at DESC
    `;

    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.updateOrderStatus = (id, status) => {
    const q = `UPDATE purchase_orders SET status = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(q, [status, id], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
