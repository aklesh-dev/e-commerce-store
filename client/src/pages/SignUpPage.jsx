import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader, Lock, Mail, User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useUserStore } from "../stores/useUserStore";

function SignUpPage() {  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <section className="flex flex-col justify-between py-2 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Create your account</h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 bg-opacity-50 backdrop-filter backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300">Full Name</label>
              <Input
                id="name"
                icon={User}
                type="text"
                required
                placeholder="Izumi Raizel"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email address</label>
              <Input
                id="email"
                icon={Mail}
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300">Password</label>
              <Input
                id="password"
                icon={Lock}
                type="password"
                required
                placeholder="**********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300">Confirm Password</label>
              <Input
                id="confirmPassword"
                icon={Lock}
                type="password"
                required
                placeholder="**********"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <motion.button
              className="mt-5 w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-800 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 uppercase"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 size-5 animate-spin" aria-hidden="true" />
                  Signing up...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 size-5" aria-hidden="true" />
                  <span>Sign up</span>
                </>
              )}
            </motion.button>
          </form>
        </div>

        <div className="px-4 py-4 bg-transparent ">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <Link to={'/login'} className="text-emerald-400 hover:text-emerald-500">
              Login <ArrowRight className="size-4 inline" />
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default SignUpPage;