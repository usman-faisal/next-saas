import { type User } from '@supabase/supabase-js';
import supabase from 'supabase';
import { Profile } from 'types/types';
import { create } from 'zustand';

interface AuthStore {
  user?: User | null;
  getUser: () => Promise<User | null>;
  logout: () => Promise<void>;
  userProfile: Profile;
  getUserProfile: () => Promise<Profile>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  userProfile: null,
  getUser: async () => {
    const { data } = await supabase.auth.getUser();
    data.user && set({ user: data.user });
    return data.user ?? null;
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  getUserProfile: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', useAuthStore.getState().user?.id ?? '')
      .single();
    if (error) throw error;
    if (data) set({ userProfile: data });
    return data;
  },
}));

export default useAuthStore;
