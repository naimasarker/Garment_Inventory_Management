const db = require('../config/db');

exports.findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM categories', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.insert = (name) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, name });
        });
    });
};

exports.update = (id, name) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err) => {
            if (err) return reject(err);
            resolve({ id, name });
        });
    });
};

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM categories WHERE id = ?', [id], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
