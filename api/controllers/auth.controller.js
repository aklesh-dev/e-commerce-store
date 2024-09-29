import { redis } from "../lib/redis.config.js";
import User from "../models/user.model.js";
import { generateTokens } from "../utils/generateTokens.js";
import { storeRefreshToken } from "../utils/storeRefreshToken.js";
import jwt from "jsonwebtoken";

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,  // prevents XSS attack prevention, cross-site scripting attack || prevent access to cookie from client side,
    secure: process.env.NODE_ENV === "production", // only send cookie over https, prevent man-in-the-middle attacks,
    sameSite: "strict", // prevents CSRF attacks, cross-site request forgery attack || prevent access to cookie from third-party site
    maxAge: 1000 * 60 * 15, // expire in 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,  // prevents XSS attack prevention, cross-site scripting attack || prevent access to cookie from client side,
    secure: process.env.NODE_ENV === "production", // only send cookie over https, prevent man-in-the-middle attacks,
    sameSite: "strict", // prevents CSRF attacks, cross-site request forgery attack || prevent access to cookie from third-party site
    maxAge: 7 * 24 * 60 * 60 * 1000, // expire in 7 days
  });
}; 

export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    // chech if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // create new user
    const user = new User({ email, password, username });
    await user.save();

    // authenticate user and generate token
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken); // store refresh token in redis

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({ 
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
       }, 
      message: "User created successfully" 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  res.send('login route called');
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refreshToken:${decode.userId}`);
    };
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });    
  }
};