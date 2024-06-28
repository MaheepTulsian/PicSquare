import express from 'express';
import User from '../database/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import multer from 'multer';
import { get } from 'mongoose';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const upload = multer();

//function to get user claims from jwt token
const getUserClaims = (req) => {
    const token = req.cookies.token;
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
};

//api for user signup
router.post('/signup', upload.none(), async (req, res) => {
    const saltRounds = 10;
    try {
        //Ensure req.body.password is defined and not null
        if (!req.body.password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
        });

        //check if the entered email already exists in the database; every email must be unique
        const emailExists = await User.findOne({ email: req .body.email });
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        else {
            await user.save();

            //add jwt token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            console.log("JWT Token:", token);
            res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000});

            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({ error: 'Internal Server Error something went wrong' });
    }
});

//api for user login
router.post('/login', upload.none(), async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne ({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials: Email not Found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials: Password Wrong' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log("JWT Token:", token);
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

//api for user logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

//api for user profile
router.post('/profile', upload.none(), async (req, res) => {
    const userClaims = getUserClaims(req);
    if (!userClaims) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await User.findOne({ 
        _id: userClaims.id, 
    });
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }
    try {
        user.bio = req.body.bio;
        user.instagram = req.body.instagram;
        user.website = req.body.website;
        user.avatar_url = req.body.avatar_url;
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

export default router;