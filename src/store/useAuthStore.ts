import { create } from 'zustand';
import api from '../lib/axios';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (username: string, password: string, isSignup?: boolean) => Promise<void>;
  logout: () => void;
}

const localUser: string | null = localStorage.getItem('user');

export const useAuthStore = create<AuthState>((set) => ({
  user:  localUser ? JSON.parse(localUser) : null,
  token: localStorage.getItem('token'),
  login: async (username: string, password: string, isSignup : boolean = false) => {
    const response = await api.post( !isSignup ? '/login' : "/register", { username, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user: user });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));