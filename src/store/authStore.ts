import { type User } from '@supabase/supabase-js';
import supabase from '../supabase/supabaseClient';
import { Profile } from 'types/interfaces';
import { create } from 'zustand';
import { getProduct, getSubscription } from '..//stripe/stripe';

interface AuthStore {
  user: User | null;
  userProfile: Profile;
  userPlan: 'Basic' | 'Premium' | 'Enterprise' | null;
  getUser: () => Promise<User | null>;
  logout: () => Promise<void>;
  getUserProfile: () => Promise<Profile>;
  getUserPlan: () => Promise<'Basic' | 'Premium' | 'Enterprise' | null>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  userProfile: null,
  userPlan: null,
  getUserPlan: async () => {
    const { data, error } = await supabase()
      .from('subscriptions')
      .select('*')
      .eq('email', useAuthStore.getState().user?.email ?? '')
      .single();
    if (data?.subscription_id) {
      if (data.end_at && new Date(data.end_at) < new Date()) {
        set({ userPlan: null });
        return null;
      }
      const subscriptionId = data.subscription_id;
      const subscription = await getSubscription(subscriptionId);
      const product = await getProduct(JSON.parse(subscription).plan.product);
      const productData = JSON.parse(product);
      set({ userPlan: productData.name });
    }
    return useAuthStore.getState().userPlan;
  },
  getUser: async () => {
    const { data } = await supabase().auth.getUser();
    data.user && set({ user: data.user });
    return data.user ?? null;
  },
  logout: async () => {
    await supabase().auth.signOut();
    set({ user: null });
  },
  getUserProfile: async () => {
    const { data, error } = await supabase()
      .from('profiles')
      .select('*, subscriptions(*)')
      .eq('id', useAuthStore.getState().user?.id ?? '')
      .single();
    if (data) set({ userProfile: data });
    return data;
  },
}));

export default useAuthStore;
