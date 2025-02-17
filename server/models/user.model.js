import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from "crypto"
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    userId:{
      type: String,
      required: [true,'userid is required'],
      unique: [true,'userid does not available'],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\+91\d{10}$|^\+91 \d{5} \d{5}$|^0\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number.`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [8,'Password must be at least 8 characters long.'],
    },
    verified:{
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
    lastLogin:{
      type: Date,
      
    },
  
    resetPasswordToken:String,
    resetPasswordTokenExpiry:Date,
    verficationToken:String,
    verificationtokenExpiry:Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateResetPasswordToken = async function(){
    const token = crypto.randomBytes(32).toString('hex');
    const resetToken = crypto.createHash('sha256').update(token).digest('hex');
    this.resetPasswordToken = resetToken;
    this.resetPasswordTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
    return token;

}
const User = mongoose.model('User', userSchema);

export default User;
