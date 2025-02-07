const dotenv = require("dotenv");
import { Router, Request, Response } from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { GridFSBucket } from 'mongodb';
import path from 'path';
import mongoose from 'mongoose';
import GridFSStorage from 'multer-gridfs-storage';

const { User,Reptile } = require('./models');
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });
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
 // console.log("✅ MongoDB connected at user.ts c:", process.env.ATLAS_URI);
  
// Connect to MongoDB (you may already have this configured)
//const mongoURI = process.env.ATLAS_URI || "";
// Connect to MongoDB without the old options
//mongoose.connect(mongoURI)
  //.then(() => console.log('Connected to MongoDB'))
 // .catch((err) => console.error('MongoDB connection error:', err));


// Initialize the connection for GridFS
//const conn = mongoose.connection;
//let gfs: GridFSBucket;

//conn.once('open', () => {
 // gfs = new mongoose.mongo.GridFSBucket(conn.db, {
  //  bucketName: 'reptileImages',
  ///});
//});

// Multer storage configuration (Memory storage)
const storage = multer.memoryStorage();
// Use multer with the GridFS storage
const upload = multer({ storage });
  
const router = Router();

router.post('/CreateAccount', async (req, res) => {
    console.log(req.body);
    try 
    {
        const { firstName, lastName, email, password, role } = req.body;
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            role: role || "user"
        });
        const savedUser = await user.save();
        res.status(201).send({ user: savedUser });
    } catch (error) {
        console.error('Error saving user or creating account:', error)
    }
})



// POST route to upload reptile image and details
router.post('/UploadReptile', upload.array('images', 5), async (req, res) => {
  try {
    console.log('Uploaded Files:', req.files);

    // Ensure req.files is an array of Express.Multer.File
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    // Extract the image Buffers from the uploaded files
    const imageBuffers: Buffer[] = files.map((file) => file.buffer);

    const { userId, reptileName, reptileCategory, reptilePrice, reptileQuantity } = req.body;

    // Save reptile info along with the image buffers
    const newReptile = new Reptile({
      userId,
      reptileName,
      reptileCategory,
      reptilePrice,
      reptileQuantity,
      images: imageBuffers, // Store the image Buffers in MongoDB
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
