import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post('/products', productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Error creating product",error.response.data.message);
      set({ loading: false });
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get('/products');
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error("Error fetching products",error.response.data.message || "Failed to fetch products!");
    }
  },
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.message || "Failed to fetch products!");  
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== productId),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      set({ error: "Failed to delete product", loading: false });
      toast.error("Error deleting product",error.response.data.message || "Failed to delete product!");
    } 
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/${productId}`);
      // this will update the isFeatured prop of the product
      set((prevState) => ({
        products: prevState.products.map((product) => 
        product._id === productId ? {...product, isFeatured: res.data.isFeatured } : product
        ),
        loading: false,
      }))
    } catch (error) {
      set({ error: "Failed to update product", loading: false });
      toast.error(error.response.data.message || "Failed to update featured product!");
    }
  },
  fetchFeaturedProducts: async () => {
    set({loading: true});
    try {
      const response = await axios.get("/products/featured");
      set({products: response.data, loading: false});
    } catch (error) {
      set({error: "Failed to fetch products", loading: false});
      console.error("Error fetching featured products:", error);      
    }
  },

}));