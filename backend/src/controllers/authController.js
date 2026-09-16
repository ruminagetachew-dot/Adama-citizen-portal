import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { ROLES } from '../constants/index.js';
import { toClient } from '../utils/toClient.js';
import { sendPasswordResetEmail } from '../utils/emailService.js';

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

export async function register(req, res, next) {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      role: ROLES.CITIZEN,
      phoneNumber: phoneNumber || '',
      isActive: true,
    });

    const token = signToken(user);

    res.status(201).json({
      success: true,
      token,
      user: toClient(user),
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = signToken(user);

    res.json({
      success: true,
      token,
      user: toClient(user),
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res) {
  res.json({ success: true, user: req.userClient });
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    // For security reasons, do not reveal if the email was found or not
    if (!user) {
      return res.json({
        success: true,
        message: 'If that email address is in our database, we will send a password reset link to it.',
      });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email
    await sendPasswordResetEmail(user, token);

    res.json({
      success: true,
      message: 'If that email address is in our database, we will send a password reset link to it.',
    });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired.',
      });
    }

    // Hash password
    user.passwordHash = await bcrypt.hash(password, 12);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.json({
      success: true,
      message: 'Your password has been successfully reset. You can now log in.',
    });
  } catch (err) {
    next(err);
  }
}
