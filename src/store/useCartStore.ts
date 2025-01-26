import { create } from 'zustand';
import { CartItem, MenuItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  addItem: (item: MenuItem) => {
    const { items } = get();
    const existingItem = items.find((i) => i._id === item._id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
    set({ total: calculateTotal(get().items) });
  },
  removeItem: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i._id !== itemId),
      total: calculateTotal(state.items.filter((i) => i._id !== itemId)),
    }));
  },
  updateQuantity: (itemId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((i) =>
        i._id === itemId ? { ...i, quantity: Math.max(0, quantity) } : i
      ),
      total: calculateTotal(
        state.items.map((i) =>
          i._id === itemId ? { ...i, quantity: Math.max(0, quantity) } : i
        )
      ),
    }));
  },

  clearCart: () => set({ items: [], total: 0 }),
}));

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};