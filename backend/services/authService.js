const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');
const sendMail = require('../utils/sendMail');
const generateVerificationToken = require('../utils/generateVerificationToken');

const register = async (userData) => {
    const { name, email, phn_no, password, role } = userData;

    if (!name || !email || !phn_no || !password || !role) {
        throw { code: 400, message: 'All fields are required!' };
    }

    const existing = await userRepo.findByEmail(email);
    if (existing) throw { code: 409, message: 'User already exists!' };

    const hashedPassword = bcrypt.hashSync(password, 10);
    const isActive = role === 'staff' ? false : true;
    const userId = await userRepo.createUser({ name, email, phn_no, password: hashedPassword, role, isActive });

    const token = generateVerificationToken();
    await userRepo.updateVerificationToken(userId, token);
    await sendMail(email, 'Email Verification OTP', `Your OTP code is: ${token}`);

    return { message: 'User registered successfully! Please verify your email.' };
};

const login = async (email, password) => {
    const user = await userRepo.findByEmail(email);
    if (!user) throw { code: 404, message: 'User not found!' };
    if (!user.is_verified) {
        const token = generateVerificationToken();
        await userRepo.updateVerificationToken(user.id, token);
        await sendMail(user.email, 'Email Verification OTP', `Your OTP code is: ${token}`);
        throw { code: 400, message: 'Account not verified. New OTP sent.' };
    }
    if (!user.is_active) throw { code: 403, message: 'Account is deactivated!' };

    const match = bcrypt.compareSync(password, user.password);
    if (!match) throw { code: 400, message: 'Incorrect email or password!' };

    const jwtToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });

    return { userId: user.id, role: user.role, token: jwtToken };
};
const verifyMail = async (email, otp) => {
    const user = await userRepo.findByEmail(email);

    if (!user) throw { code: 404, message: 'Email not found' };
    if (user.verification_token !== otp) {
        throw { code: 400, message: 'Incorrect OTP!' };
    }

    await userRepo.verifyUser(email);

    if (user.role === 'staff') {
        const ManagerEmail = await userRepo.getAdminEmail();
        if (ManagerEmail) {
            const subject = 'New Staff Verified';
            const content = `A new staff member (${user.fname} ${user.lname}) has been verified. Please review their details.`;
            await sendMail(ManagerEmail, subject, content);
        }
    }

    const jwtToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return {
        token: jwtToken,
        userId: user.id,
        role: user.role,
        is_active: user.is_active
    };
};

module.exports = { register, login, verifyMail };
