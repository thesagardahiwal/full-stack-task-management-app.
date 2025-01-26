import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { Delete } from 'lucide-react';
import api from '../lib/axios';
import { MenuItem } from '../types';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../components/Item/ItemForm';
import PrivateRoute from '../components/PrivateRoute';
import { useMenuStore } from '../store/useMenuStore';

export const Menu = () => {
  const { menu: menuItems, updateMenu, removeItem } = useMenuStore();
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addItem);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [isUpdating, setIsUpdating] = useState<{ item: MenuItem | undefined; status: boolean }>({ status: false, item: undefined });

  const addItemToMenu = () => {
    return navigate('/new');
  };

  const deleteFromMenu = async (item: MenuItem) => {
    try {
      const response = await api.delete(`/menu/${item._id}`);
      if (response) {
        alert("Item deleted successfully!");
        removeItem(item._id);
      };

      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get('/menu');
        updateMenu(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    // Close the form if click happens outside of the formRef
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsUpdating({ item: undefined, status: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 onClick={() => setIsUpdating({ item: item, status: true })} className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{item.category}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
                {user && (
                  <button
                    onClick={() => deleteFromMenu(item)}
                    className="flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Delete className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                )}
                {user && (
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-5 w-5 mr-1" />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PrivateRoute>
        <div onClick={addItemToMenu} className='fixed bottom-0 right-0 p-4'>
          <button className='flex items-center px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <Plus className="h-5 w-5 mr-1" />
            Add Item
          </button>
        </div>

        {isUpdating.status &&
          (<div className='absolute top-0 left-0 right-0 bottom-0 bg-white/80 flex-1 items-center justify-center'>
            <div ref={formRef}>
              <ItemForm item={isUpdating.item} />
            </div>

            <h2 className='text-slate-300 text-center mt-10 font-medium text-2xl'>Click Here to go back</h2>
          </div>)
        }
      </PrivateRoute>

    </div>
  );
};