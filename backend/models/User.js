
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {type:String, required:true},
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  role:{type:String, enum:['user','admin'], default:'user'},
  createdAt:{type:Date, default:Date.now}
});

// hash password
UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function(candidate){
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model('User', UserSchema);
