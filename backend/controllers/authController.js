const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(200).json({ status: 'success', message: result.message });
    } catch (err) {
        res.status(err.code || 500).json({ status: 'error', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', error: 'Email and password are required' });
    }

    try {
        const { id, role, is_active, token } = await authService.login(email, password);

        res.cookie('accessToken', token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
        });

        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            id,
            role,
            is_active,
            token
        });
    } catch (err) {
        res.status(err.code || 500).json({ status: 'error', error: err.message });
    }
};
exports.verifyMail = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ status: 'error', message: 'Please provide both email and OTP' });
    }

    try {
        const { userId, role, is_active, token } = await authService.verifyMail(email, otp);

        res.cookie('accessToken', token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES || 1) * 24 * 60 * 60 * 1000),
        }).status(200).json({
            status: 'success',
            message: 'Email verified successfully!',
            id: userId,
            role,
            is_active,
            token
        });
    } catch (err) {
        res.status(err.code || 500).json({ status: 'error', message: err.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('accessToken', { sameSite: 'none', secure: true }).status(200).json('User logged out!');
};
