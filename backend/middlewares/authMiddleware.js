const jwt = require('jsonwebtoken');
const userService = require('../services/authService');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access token is missing' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const isActive = await userService.isUserActive(decoded.id);
        if (!isActive) return res.status(403).json({ error: 'Your account has been deactivated!' });

        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

const isAdmin = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(403).json({ error: 'Authentication error: User ID missing' });
    }

    try {
        const isAdmin = await userService.isUserAdmin(req.user.id);
        if (!isAdmin) return res.status(403).json({ error: 'Access denied. Admins only.' });
        next();
    } catch (err) {
        console.error('Error checking admin role:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const isManager = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(403).json({ error: 'Authentication error: User ID missing' });
    }

    try {
        const isManager = await userService.isUserManager(req.user.id);
        if (!isManager) return res.status(403).json({ error: 'Access denied. Managers only.' });
        next();
    } catch (err) {
        console.error('Error checking manager role:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { authenticateToken, isAdmin, isManager };
