const db = require('../config/db');

exports.findAllWithVariants = () => {
    const q = `
        SELECT 
            p.id AS product_id,
            p.name AS product_name,
            p.sku,
            cat.name AS category_name,
            v.id AS variant_id,
            v.size, v.color, v.quantity
        FROM products p
        LEFT JOIN categories cat ON p.category_id = cat.id
        LEFT JOIN product_variants v ON p.id = v.product_id
    `;

    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err) return reject(err);

            // Group by product
            const grouped = {};
            results.forEach(row => {
                const pid = row.product_id;
                if (!grouped[pid]) {
                    grouped[pid] = {
                        id: pid,
                        name: row.product_name,
                        sku: row.sku,
                        category: row.category_name,
                        variants: [],
                    };
                }

                if (row.variant_id) {
                    grouped[pid].variants.push({
                        id: row.variant_id,
                        size: row.size,
                        color: row.color,
                        quantity: row.quantity,
                    });
                }
            });

            resolve(Object.values(grouped));
        });
    });
};

exports.insertProduct = ({ name, category_id, sku }) => {
    const q = 'INSERT INTO products (name, category_id, sku) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(q, [name, category_id, sku], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

exports.insertVariants = (productId, variants) => {
    const q = `
        INSERT INTO product_variants (product_id, size, color, quantity)
        VALUES ?
    `;
    const values = variants.map(v => [productId, v.size, v.color, v.quantity]);

    return new Promise((resolve, reject) => {
        db.query(q, [values], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

exports.replaceVariants = async (productId, variants) => {
    await exports.deleteVariants(productId);
    return exports.insertVariants(productId, variants);
};

exports.deleteVariants = (productId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM product_variants WHERE product_id = ?', [productId], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

exports.updateProduct = (id, product) => {
    const q = 'UPDATE products SET name = ?, category_id = ?, sku = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(q, [product.name, product.category_id, product.sku, id], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

exports.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
