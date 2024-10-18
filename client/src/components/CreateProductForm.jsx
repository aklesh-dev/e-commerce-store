import { useState } from 'react'
import { motion } from 'framer-motion';
import { Loader, PlusCircle, Upload } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';

// categories array
const categories = ['jeans', 't-shirts', 'bags', 'glasses', 'jackets', 'suits', 'shoes'];

function CreateProductForm() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  // get the createProducts function from the useProductStore
  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: '',
        description: '',
        price: '',  
        category: '',
        image: '',
      });      
    } catch (error) {
      console.error("Error creating product", error);      
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);  // base64 string of the file
    }

  };

  return (
    <motion.section
      className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'tween' }}
    >
      <h2 className="text-2xl font-semibold text-emerald-300 mb-6">Create a new product</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor="name" className='block text-sm text-gray-300 font-semibold'>Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
            className='mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
          />
        </div>

        <div>
          <label htmlFor="description" className='block text-sm text-gray-300 font-semibold'>Description</label>
          <textarea
            rows={3}
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
            className='mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
          />
        </div>
        <div>
          <label htmlFor="price" className='block text-sm text-gray-300 font-semibold'>Price</label>
          <input
            type="number"
            id="price"
            name="price"
            step={0.01}
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
            className='mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
          />
        </div>
        <div>
          <label htmlFor="category" className='block text-sm text-gray-300 font-semibold'>Category</label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            required
            className='mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className='flex items-center mt-2'>
          <input type="file" id='image' className='sr-only' accept='/*'
            onChange={handleImageChange}
          />
          <label htmlFor="image"
            className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4
            font-semibold text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
          >
            <Upload className='size-5 inline-block mr-2' />
            Upload an image
          </label>
          {newProduct.image && <span className='ml-3 text-sm text-green-400'>Image uploaded</span>}
        </div>

        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className='size-5 mr-2 animate-spin' aria-hidden='true' />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className='size-5 mr-2' />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.section>
  )
}

export default CreateProductForm;