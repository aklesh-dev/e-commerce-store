import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: '/jeans', name: 'Jeans', imageUrl: '/jeans.jpg' },
  { href: '/t-shirts', name: 'T-shirts', imageUrl: '/tshirts.jpg' },
  { href: '/bags', name: 'Bags', imageUrl: '/bags.jpg' },
  { href: '/glasses', name: 'Glasses', imageUrl: '/glasses.png' },
  { href: '/jackets', name: 'Jackets', imageUrl: '/jackets.jpg' },
  { href: '/shoes', name: 'Shoes', imageUrl: '/shoes.jpg' },
  { href: '/suits', name: 'Suits', imageUrl: '/suits.jpg' },
];

export default function HomePage() {

  const { fetchFeaturedProducts, isLoading, products } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  },[fetchFeaturedProducts]);

  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-6">
          Explore Our Products
        </h1>
        <p className="text-center text-lg text-gray-300 mb-12">
          Discover our wide range of products and find the perfect fit for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>

        {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts = {products} /> }
      </div>
    </section>
  )
};
