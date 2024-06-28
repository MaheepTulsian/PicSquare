import express from 'express';
import User from '../database/userSchema.js';
import Art from '../database/artSchema.js';
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

//api to display user details
router.get('/showUser', async (req, res) => {
    const userClaims = getUserClaims(req);
    if (!userClaims) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ 
        _id: userClaims.id,
    });
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    res.json(user);
});

//api to upload Art
router.post('/art', upload.none(), async (req, res) => {
    const userClaims = getUserClaims(req);
    if (!userClaims) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ 
        _id: userClaims.id,
    });
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    const art = new Art({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        is_premium: req.body.is_premium,
        price: req.body.price,
        author_first_name: user.first_name,
        author_last_name: user.last_name,
        author_avatar: user.avatar_url,
        author: user._id,
    });
    try{
        const savedArt = await art.save();

        user.my_creations.push(savedArt._id);
        await user.save();

        res.json(savedArt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//api to get all arts of a particular user
router.get('/getUserArt', async (req, res) => {
    const userClaims = getUserClaims(req);
    if (!userClaims) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ 
        _id: userClaims.id,
    });
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    const arts = await Art.find({ author: user._id });
    res.json(arts);
});

//api to get all arts
router.get('/getAllArt', async (req, res) => {
    const arts = await Art.find({});
    res.json(arts);
} );

//api to add art to favourites
router.post('/addFavourite', upload.none(), async (req, res) => {
    const userClaims = getUserClaims(req);
    if (!userClaims) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ 
        _id: userClaims.id,
    });
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    const art = await Art.findOne({ 
        _id: req.body.art_id,
    });
    if (!art) {
        return res.status(401).json({ message: "Art not found" });
    }
    user.favorites.push(art._id);
    await user.save();
    res.json(user);
});

//api to remove art from favourites
router.post('/removeFavourite', upload.none(), async (req, res) => {
    const userClaims = getUserClaims(req);
    if (!userClaims) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ 
        _id: userClaims.id,
    });
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    const art = await Art.findOne({ 
        _id: req.body.art_id,
    });
    if (!art) {
        return res.status(401).json({ message: "Art not found" });
    }
    user.favorites = user.favorites.filter(fav => fav.toString() !== art._id.toString());
    await user.save();
    res.json(user);
});

// api to get user's favorite artworks
router.get('/getUserFavorites', async (req, res) => {
    try {
      // Check if user is authenticated
      const userClaims = getUserClaims(req);
      if (!userClaims) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Find the user based on user ID
      const user = await User.findOne({ _id: userClaims.id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Fetch details of favorite artworks
        const favoriteArtworks = await Art.find({ _id: { $in: user.favorites } });
       
        // Optionally, you can manipulate the data before sending the response
        // For example, you can remove some fields from the response
        const modifiedArtworks = favoriteArtworks.map(artwork => {
            return {
                title: artwork.title,
                description: artwork.description,
                image_url: artwork.image_url,
                is_premium: artwork.is_premium,
                price: artwork.price,
                author_first_name: artwork.author_first_name,
                author_last_name: artwork.author_last_name,
                author_avatar: artwork.author_avatar,
            };
        }
        );
        res.json(modifiedArtworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//api to add a art to purchase history
router.post('/addPurchase', upload.none(), async (req, res) => {
    const userClaims = getUserClaims(req);
    if (!userClaims) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ 
        _id: userClaims.id,
    });
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    const art = await Art.findOne({ 
        _id: req.body.art_id,
    });
    if (!art) {
        return res.status(401).json({ message: "Art not found" });
    }
    //check if this id is already in purchase history
    if(user.purchases.includes(art._id)){
        return res.status(402).json({ message: "Art already purchased" });
    }
    user.purchases.push(art._id);
    await user.save();
    res.json(user);
});

export default router;