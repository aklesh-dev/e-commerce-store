import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, ArrowRight, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../components/Input";

function LoginPage() {
  const [formData, setFormData] = useState({    
    email: "",
    password: "",    
  });

  const loading = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col justify-between py-2 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Login to your account</h2>
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
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email address</label>
              <Input
                id="email"
                icon={Mail}
                type="email"
                required
                placeholder="izumi@example.com"
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
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 size-5" aria-hidden="true" />
                  <span>Log in</span>
                </>
              )}
            </motion.button>
          </form>
        </div>

        <div className="px-4 py-4 bg-transparent ">
          <p className="text-sm text-gray-300">
            Not a member yet?{" "}
            <Link to={'/signup'} className="text-emerald-400 hover:text-emerald-500">
              Sign up now <ArrowRight className="size-4 inline" />
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default LoginPage;