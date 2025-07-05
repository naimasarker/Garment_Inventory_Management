const db = require('../config/db');

exports.insertTransaction = (data) => {
    const q = `INSERT INTO stock_transactions 
        (variant_id, transaction_type, quantity, performed_by, remarks)
        VALUES (?, ?, ?, ?, ?)`;

    const values = [data.variant_id, data.transaction_type, data.quantity, data.performed_by, data.remarks];

    return new Promise((resolve, reject) => {
        db.query(q, values, (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

exports.getVariantById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM product_variants WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.updateVariantQuantity = (variantId, quantity) => {
    const q = 'UPDATE product_variants SET quantity = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(q, [quantity, variantId], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

exports.findAllWithJoins = () => {
    const q = `
        SELECT 
            st.id, st.transaction_type, st.quantity, st.remarks, st.created_at,
            pv.size, pv.color, pv.quantity AS current_quantity,
            p.name AS product_name,
            c.name AS category_name,
            u.name AS performed_by_name
        FROM stock_transactions st
        JOIN product_variants pv ON st.variant_id = pv.id
        JOIN products p ON pv.product_id = p.id
        JOIN categories c ON p.category_id = c.id
        JOIN users u ON st.performed_by = u.id
        ORDER BY st.created_at DESC
    `;

    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
