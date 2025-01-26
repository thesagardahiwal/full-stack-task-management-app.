import { create } from "zustand";
import { MenuItem } from "../types";


interface MenuState {
    menu: MenuItem[];
    addItem: (item: MenuItem) => void;
    removeItem: (itemId: string) => void;
    updateMenuItem: (item: MenuItem) => void;
    updateMenu: (items: MenuItem[]) => void;
};

export const useMenuStore = create<MenuState>((set, get) => ({
  menu: [],
  updateMenu: (items: MenuItem[]) => {
    set({ menu: items });
  }, 
  addItem: (item: MenuItem) => {
    const { menu } = get();
    set({ menu: [...menu, item] });
  },

  removeItem: (itemId: string) => {
    set((state) => ({
      menu: state.menu.filter((i) => i._id !== itemId)
    }));
  },
  updateMenuItem: (item: MenuItem) => {
    set((state) => ({
      menu: state.menu.map((i) =>
        i._id === item._id ? item : i
      )
    }));
  },
}));