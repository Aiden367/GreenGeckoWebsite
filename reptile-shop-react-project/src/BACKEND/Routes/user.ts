const dotenv = require("dotenv");
import { Router, Request, Response } from 'express';
import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { GridFSBucket } from 'mongodb';
import path from 'path';
import mongoose from 'mongoose';
import GridFSStorage from 'multer-gridfs-storage';
const bcrypt = require("bcrypt");
const { User,Reptile } = require('./Models');
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });
const jwt = require("jsonwebtoken");
// At the top of your file, before the code that uses req.files




if (result.error) {
    console.error('Error loading .env file:', result.error);
  } else {
    console.log('.env file loaded successfully');
  }
  
  if (!process.env.ATLAS_URI) {
    console.error("❌ MongoDB URI is missing! Check your .env file.");
    process.exit(1);
  }
 
  
// Multer storage configuration (Memory storage)

  
const router = Router();

// Google Cloud Storage setup
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME as string);

// Multer storage configuration for GCS
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });


router.post('/CreateAccount', async (req, res) => {
    console.log(req.body);
    try 
    {
      // Generate a salt and hash the password with the salt
      
        const { firstName, lastName, email, password, role } = req.body;
        const salt = await bcrypt.genSalt(10);  // 10 rounds of salt
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || "user"
        });
        const savedUser = await user.save();
        res.status(201).send({ user: savedUser });
    } catch (error) {
        console.error('Error saving user or creating account:', error)
    }
})

router.post("/Login",async(req,res) =>{
const{firstName,lastName,password} = req.body;
const user = await User.findOne({firstName,lastName})
if (!user) {
  return res.status(401).send({ error: "Invalid username or password" });
}
// Compare the provided password with the hashed password in the database
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(401).send({ error: "Invalid username or password" });
}

// Generate a JWT for the user, including the role in the payload
const token = jwt.sign(
  { 
      id: user._id, 
      username: user.username,
      role: user.role  // Include the role in the token
  }, 
  process.env.JWT_SECRET, 
  { expiresIn: '1h' }
);
// Respond with the token, user info, and account details
res.status(200).send({ token, user: { id: user._id, username: user.username, role: user.role }
})});

router.post('/UploadReptile', upload.array('images', 5), async (req: Request, res: Response) => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const files = req.files as Express.Multer.File[];

    const imageUrls: string[] = [];

    // Upload each image to GCS
    for (const file of files) {
      const fileName = `reptiles/${Date.now()}-${file.originalname}`;
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.end(file.buffer);

      const imageUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${fileName}`;
      imageUrls.push(imageUrl);
    }

    const { userId, reptileName, reptileCategory, reptilePrice, reptileQuantity } = req.body;

    // Save reptile info along with image URLs
    const newReptile = new Reptile({
      userId,
      reptileName,
      reptileCategory,
      reptilePrice,
      reptileQuantity,
      images: imageUrls, // Store URLs instead of image buffers
      dateUploaded: new Date().toISOString(),
    });

    await newReptile.save();
    res.status(201).json({ message: 'Reptile added successfully!', reptile: newReptile });
  } catch (error) {
    console.error('Error uploading reptile profile:', error);
    res.status(500).json({ error: 'Error uploading reptile profile' });
  }
});









  
module.exports = router;
