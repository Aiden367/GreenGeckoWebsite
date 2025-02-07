import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, required:true}
})
const User = mongoose.model('User',UserSchema);

const ReptileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reptileName: { type: String, required: true },
    reptileCategory: { type: String, required: true },
    reptilePrice: { type: String, required: true },
    reptileQuantity: { type: String, required: true },
    images: [{ type: String }],
    dateUploaded: { type: String, required: true }
  });

const Reptile = mongoose.model('Reptile',ReptileSchema);

module.exports = {User,Reptile};