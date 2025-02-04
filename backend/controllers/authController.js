const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const admin = require('firebase-admin');

// Registration Controller
const register = async (req, res) => {
    const { name, email, password, gradeLevel } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload profile picture if provided
        let profilePicture = { public_id: '', url: '' };
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'profile',
                width: 150,
                crop: 'scale',
            });
            profilePicture = { public_id: result.public_id, url: result.secure_url };
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gradeLevel,
            role: 'user', // Default role
            profilePicture
        });

        // Generate JWT token (30-day expiration)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
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

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
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
                await cloudinary.uploader.destroy(profilePicture.public_id);
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

module.exports = { register, login, user, updateProfile, verifyFirebaseToken };
