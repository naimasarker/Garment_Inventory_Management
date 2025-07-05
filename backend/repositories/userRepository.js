const db = require('../config/db');

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const q = 'SELECT * FROM users WHERE email = ?';
        db.query(q, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};
exports.createUser = ({ name, email, phn_no, password, role, isActive }) => {
    return new Promise((resolve, reject) => {
        const q = 'INSERT INTO users (name, email, phn_no, password, role, is_active) VALUES (?)';
        const values = [[name, email, phn_no, password, role, isActive]];
        db.query(q, values, (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

exports.updateVerificationToken = (id, token) => {
    return new Promise((resolve, reject) => {
        const q = 'UPDATE users SET verification_token = ? WHERE id = ?';
        db.query(q, [token, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.verifyUser = (email) => {
    return new Promise((resolve, reject) => {
        const q = 'UPDATE users SET is_verified = 1, verification_token = NULL WHERE email = ?';
        db.query(q, [email], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.getManagerEmail = () => {
    return new Promise((resolve, reject) => {
        const q = 'SELECT email FROM users WHERE role = "manager" LIMIT 1';
        db.query(q, (err, rows) => {
            if (err) return reject(err);
            resolve(rows.length > 0 ? rows[0].email : null);
        });
    });
};
exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        const q = 'SELECT * FROM users WHERE id = ?';
        db.query(q, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};