import express from "express";
import cloudinary from "../utils/Cloudinary.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/upload", upload.single("image"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
    console.log(result);
  });
});

export default router;
