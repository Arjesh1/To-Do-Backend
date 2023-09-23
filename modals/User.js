const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;