import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'نام کاربری الزامی است'],
      unique: true,
      trim: true,
     
    },
    email: {
      type: String, required: true, unique: true 
      },
    password: {
      type: String,
      required: [true, 'رمز عبور الزامی است'],
      
    },
    firstName: {
      type: String,
      trim: true,
      
    },
    lastName: {
      type: String,
      trim: true,
      
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      //default: 'user',
    },
   
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);




userSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;