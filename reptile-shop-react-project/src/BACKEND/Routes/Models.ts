import mongoose, { Document, Schema } from 'mongoose';

// User model interface
interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

// Reptile model interface
export type ReptileDocument = Document & {
  userId: mongoose.Schema.Types.ObjectId;
  reptileName: string;
  reptileCategory: string;
  reptilePrice: string;
  reptileQuantity: string;
  images: Buffer[];  // Store image Buffers
  dateUploaded: string;
  imageBase64?: string[];  // Add imageBase64 as an optional field for the response
};


// ReptileImageForHomeScreen model interface
interface ReptileImageForHomeScreenDocument extends Document {
  imageUrl: string;
  title: string;
}

// User schema definition
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Create User model
const User = mongoose.model<UserDocument>('User', UserSchema);

// Reptile schema definition
const ReptileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reptileName: { type: String, required: true },
  reptileCategory: { type: String, required: true },
  reptilePrice: { type: String, required: true },
  reptileQuantity: { type: String, required: true },
  images: { type: [String], required: true },
  dateUploaded: { type: String, required: true },
});

// Create Reptile model
const Reptile = mongoose.model<ReptileDocument>('Reptile', ReptileSchema, 'reptiles');

// ReptileImageForHomeScreen schema definition
const reptileImageForHomePageSchema = new mongoose.Schema({
  imageUrl: {
    type: String, // Store the URL or the path to the image
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// Create ReptileImageForHomeScreen model
const ReptileImageForHomeScreen = mongoose.model<ReptileImageForHomeScreenDocument>('ReptileImageForHomeScreen', reptileImageForHomePageSchema);

// Exporting models and types
export { User, Reptile, ReptileImageForHomeScreen };
