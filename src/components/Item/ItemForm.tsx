import React, { useState, useEffect } from 'react';
import { MenuItem } from "../../types";
import api from "../../lib/axios"; 
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../../store/useMenuStore';

function ItemForm({ item }: { item?: MenuItem }) {
  const { updateMenuItem, addItem } = useMenuStore();

  const [name, setName] = useState(item?.name || "");
  const [category, setCategory] = useState(item?.category || "");
  const [price, setPrice] = useState(item?.price || 0);
  const [availability, setAvailability] = useState<boolean>(item?.availability ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigate();

  useEffect(() => {
    if (item) {
      setName(item.name);
      setCategory(item.category);
      setPrice(item.price);
      setAvailability(item.availability);
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = { name, category, price, availability };

    try {
      if (item) {
        // Update existing item
        await api.put(`/menu/${item._id}`, payload);
        updateMenuItem({
          name, price, category, availability, _id: item._id
        });
        alert("Menu item updated successfully!");
      } else {
        // Create new item
        await api.post("/menu", payload);
        alert("Menu item created successfully!");
        navigation("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id='item-form' onSubmit={handleSubmit} className="p-4 mt-10 bg-white border rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{item ? "Edit Menu Item" : "Create Menu Item"}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Availability</label>
        <select
          value={availability ? "true" : "false"}
          onChange={(e) => setAvailability(e.target.value === "true")}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={loading}
      >
        {loading ? "Submitting..." : item ? "Update Item" : "Create Item"}
      </button>
    </form>
  );
}

export default ItemForm;
