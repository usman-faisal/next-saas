import { type User } from '@supabase/supabase-js';
import supabase from 'supabase';
import { create } from 'zustand';

interface useAuthStore {
  user?: User | null;
  getUser: () => Promise<User | null>;
  logout: () => Promise<void>;
}

const useAuthStore = create<useAuthStore>((set) => ({
  user: null,
  getUser: async () => {
    const { data } = await supabase.auth.getUser();
    data.user && set({ user: data.user });
    return data.user ?? null;
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

export default useAuthStore;
