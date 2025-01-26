export interface User {
  id: string;
  username: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  availability: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  _id: string;
  items: {
    menuItemId: MenuItem;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}