import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
    res.status(200).json(coupon || null);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code: code, userId: req.user._id, isActive: true });
    if (!coupon) {
      return res.status(400).json({ message: "Invalid Coupon Code" });
    }

    if(coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(400).json({ message: "Coupon Expired" });
    }

    res.status(200).json({ 
      message: "Coupon Validated",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};