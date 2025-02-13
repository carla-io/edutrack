const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS  // Your App Password
    }
});

// Registration Controller
const register = async (req, res) => {
    const { name, email, password, gradeLevel } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePicture = { public_id: '', url: '' };
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'profile',
                width: 150,
                crop: 'scale',
            });
            profilePicture = { public_id: result.public_id, url: result.secure_url };
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gradeLevel,
            role: 'user',
            profilePicture,
            isVerified: false // New user must verify email
        });

        // Generate verification token
        const verificationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const verificationLink = `http://localhost:4000/api/auth/verify-email?token=${verificationToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Verify Your Email",
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: "User registered! Please check your email to verify.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gradeLevel: user.gradeLevel,
                role: user.role,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email before logging in.' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gradeLevel: user.gradeLevel,
                role: user.role,
                profilePicture: user.profilePicture,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get user details from token
const user = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        const { name, email, gradeLevel } = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Upload new profile picture if provided
        let profilePicture = user.profilePicture;
        if (req.file) {
            if (profilePicture?.public_id) {
                await cloudinary.uploader.destroy(profilePicture.public_id); // Remove old image if exists
            }
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'profile',
                width: 150,
                crop: 'scale',
            });
            profilePicture = { public_id: result.public_id, url: result.secure_url };
        }
        

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.gradeLevel = gradeLevel || user.gradeLevel;
        user.profilePicture = profilePicture;

        await user.save();

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Firebase Token Verification Middleware
const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.isVerified = true;
        await user.save();

        res.json({ message: "Email verified successfully! You can now log in." });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};


module.exports = { register, login, user, updateProfile, verifyFirebaseToken, verifyEmail };
