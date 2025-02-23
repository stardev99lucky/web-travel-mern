// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    firstname: { type: "String", required: true },
    lastname: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    phone: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(this.password)
  console.log(bcrypt.hashSync(enteredPassword))
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("1",this.password)
});

const User = mongoose.model("User", userSchema);

export default User;
