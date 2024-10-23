import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import PeopleAlsoBrought from "../components/PeopleAlsoBrought";
import OrderSummary from "../components/OrderSummary";

export default function CartPage() {
  const { cart } = useCartStore();

  return (
    <section className="py-8 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (<CartItem key={item._id} item={item} />))}
              </div>
            )}
            {cart.length > 0 && <PeopleAlsoBrought />}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="max-w-4xl mx-auto lg:w-full mt-6 flex-1 space-y-6 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              {/* <GiftCouponCart />  */}

            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
};

const EmptyCartUI = () => (
  <motion.div
    className='flex flex-col items-center justify-center space-y-4 py-16'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className='h-24 w-24 text-gray-300' />
    <h3 className='text-2xl font-semibold '>Your cart is empty</h3>
    <p className='text-gray-400'>Looks like you {"haven't"} added anything to your cart yet.</p>
    <Link
      className='mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600'
      to='/'
    >
      Start Shopping
    </Link>
  </motion.div>
);