import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,  
  checkingAuth: true,

  signup: async ({ username, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return;
    };

    try {
      const res = await axios.post('/auth/signup', {username, email, password}); 
      set({ user: res.data.user, loading: false });

    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data.message || "Error signing up");
    };

  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post('/auth/login', { email, password });
      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data.message || "Error logging in");
    };      
    
  },

  checkAuth: async () => {
    set({ checkingAuth: true});
    try {
      const res = await axios.get('/auth/profile');
      set({ user: res.data.user, checkingAuth: false });
    } catch (error) {
      console.error(error.message);
      set({ checkingAuth: false, user: null });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post('/auth/logout');
      set({ user: null, loading: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data.message || "Error logging out");
    };
  },

}));

// TODO: Implement axios interceptors to handle refreshing access tokens