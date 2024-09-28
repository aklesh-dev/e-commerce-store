import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [6, "Password should be at least 6 characters long."]
  },
  cartItems: [
    {
      quantity: { type: Number, default: 1},
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    }
  ],
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },  

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(this.password, salt);
    this.password = hash; 
    next();   
  } catch (error) {
    next(error);
  }
});

// Compare password with hash
userSchema.methods.comparePassword = async function (password) {
  return bcryptjs.compareSync(password, this.password);
};

export default User;