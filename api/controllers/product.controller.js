import { redis } from "../lib/redis.config.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ messsage: "Internal Server Error", error: error.messsage });    
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts){
      return res.status(200).json(JSON.parse(featuredProducts));
    }

    // if not in redis, fetch from mongodb
    // .lean() is gonna return plain javascript objects instead of mongoose documents
    // which is good for performance
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if(!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }
    // set in redis for future use
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    return res.status(200).json(featuredProducts);
  } catch (error) {
    res.status(500).json({ messsage: "Internal Server Error", error: error.messsage });    
  }
};