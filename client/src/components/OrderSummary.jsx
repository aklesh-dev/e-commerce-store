import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";


const stripePromise = loadStripe("pk_test_51Q5M7oRoWxrNBpB7CRdw6M5kZ19s6WbjlCbUVvBine0eFsQqiWUauW4frXOha5xTgA2ZM9uDFlrRqmRttIBrymUJ00gbB4JKWC");

export default function OrderSummary() {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });
    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.error("Error:", result.error)
    };
  };

  return (
    <motion.section
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 sm:p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-emerald-400">Order Summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">Original Price</dt>
            <dd className="text-base font-medium text-gray-100">${formattedSubtotal}</dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-emerald-400">{formattedSavings}</dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Coupon({coupon.code})</dt>
              <dd className="text-base font-medium text-emerald-400">{coupon.discountPercentage}%</dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4 border-t border-gray-700 pt-4">
            <dt className="text-base font-semibold text-white">Total Price</dt>
            <dd className="text-base font-semibold text-emerald-400">${formattedTotal}</dd>
          </dl>
        </div>

        <motion.button
          className="flex items-center justify-center w-full rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-4  focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStripePayment}
        >
          Proceed to Checkout
        </motion.button>

        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-gray-400'>or</span>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>

    </motion.section>
  )
}
