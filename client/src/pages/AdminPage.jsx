import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import AnalyticsTabs from "../components/AnalyticsTabs";
import ProductsList from "../components/ProductsList";
import CreateProductForm from "../components/CreateProductForm";

const tabs = [
  { id: 'create', label: 'Create Product', icon: PlusCircle },
  { id: 'products', label: 'Products', icon: ShoppingBasket },
  { id: 'analytics', label: 'Analytics', icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <section className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold text-center text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 
              ${activeTab === tab.id ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}

            >
              <tab.icon className="mr-2 size-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'create' && <CreateProductForm />}
        {activeTab === 'products' && <ProductsList />}
        {activeTab === 'analytics' && <AnalyticsTabs />}
      </div>
    </section>
  )
}

export default AdminPage;