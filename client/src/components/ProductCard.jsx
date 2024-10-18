import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

export default function ProductCard({ product }) {

  const { user } = useUserStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add to cart", {
        id: "login-toast",
        duration: 2000,
        icon: "🤔",
      });
      return;
    }
    else {
      // Add to cart logic here
      toast.success("Added to cart", {
        duration: 2000,
        icon: "👍",
      });
    }
  };

  return (
    <section className="flex flex-col relative overflow-hidden shadow-lg rounded-lg border border-gray-700">
      <div className="relative mx-3 mt-3 flex h-60 w-60 overflow-hidden rounded-xl">
        <img src={product.image} className="object-cover w-full h-full" alt="product image" />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      <div className="mt-4 px-3 pb-5">
        <h5 className="text-xl font-semibold tracking-tighter text-white">{product.name}</h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl text-emerald-400 font-bold">${product.price}</span>
          </p>
        </div>
        <button className="flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm hover:bg-opacity-90 transition-opacity duration-300 ease-in-out"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to cart
        </button>

      </div>
    </section>
  )
};
