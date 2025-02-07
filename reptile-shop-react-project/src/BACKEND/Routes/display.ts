const dotenv = require("dotenv");
import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import { Reptile, ReptileDocument } from './Models';


const router = Router();

//const imageType = await import('image-type');



router.get("/GetLatestReptile", async (req, res) => {
  try {
    // Fetch the latest 5 reptiles
    const latestReptiles: ReptileDocument[] = await Reptile.find()
      .sort({ _id: -1 })
      .limit(5);

    // Modify response to include image URLs
    const reptilesWithImageURLs = latestReptiles.map(reptile => ({
      _id: reptile._id,
      reptileName: reptile.reptileName,
      reptileCategory: reptile.reptileCategory,
      reptilePrice: reptile.reptilePrice,
      reptileQuantity: reptile.reptileQuantity,
      images: reptile.images, // These are already URLs
      dateUploaded: reptile.dateUploaded
    }));

    // Send the response
    res.json(reptilesWithImageURLs);
  } catch (err) {
    console.error("Can't get latest reptiles added", err);
    res.status(500).send("Server error");
  }
});










module.exports = router;