import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
},{timestamps:true})

const User = mongoose.models.User|| mongoose.model('User',UserSchema)

export default User;

// In summary, this code sets up a Mongoose model for a user with a schema 
// containing username and password fields, and it includes automatic timestamps for document creation and updating.