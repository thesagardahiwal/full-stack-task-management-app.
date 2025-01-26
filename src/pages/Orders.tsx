import React, { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Order } from '../types';

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Order History</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    Order placed: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    Status: {order.status}
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
              </div>
              
              <ul className="mt-4 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.menuItemId._id} className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.menuItemId.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.menuItemId.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};