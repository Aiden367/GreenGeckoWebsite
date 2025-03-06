const dotenv = require("dotenv");
import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import { Reptile, ReptileDocument } from './Models';


const router = Router();

//const imageType = await import('image-type');



router.get("/GetLatestReptile", async (req: Request, res: Response) => {
  try {
    // Fetch the latest 5 reptiles and populate user details
    const latestReptiles: ReptileDocument[] = await Reptile.find()
      .sort({ _id: -1 })
      .limit(5)
      .populate('userId', 'firstName lastName'); // Populate firstName and lastName from User model

    // Modify response to include user details
    const reptilesWithUserDetails = latestReptiles.map(reptile => ({
      _id: reptile._id,
      reptileName: reptile.reptileName,
      reptileCategory: reptile.reptileCategory,
      reptilePrice: reptile.reptilePrice,
      reptileQuantity: reptile.reptileQuantity,
      images: reptile.images, // These are already URLs or Buffers
      dateUploaded: reptile.dateUploaded,
      uploadedBy: reptile.userId
        ? { 
            firstName: (reptile.userId as any).firstName, 
            lastName: (reptile.userId as any).lastName 
          }
        : null
    }));

    // Send the response
    res.json(reptilesWithUserDetails);
  } catch (err) {
    console.error("Can't get latest reptiles added", err);
    res.status(500).send("Server error");
  }
});












module.exports = router;