import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userID: {type:mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, required:true}
})
const User = mongoose.model('User',UserSchema);


module.exports = {User};