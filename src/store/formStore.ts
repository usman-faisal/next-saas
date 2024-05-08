import { type User } from '@supabase/supabase-js';
import supabase from 'supabase';
import { UserForm } from 'types/interfaces';
import { Profile } from 'types/types';
import { create } from 'zustand';

interface FormStore {
  userForms: UserForm[];
}

const useFormStore = create<FormStore>((set) => ({
  userForms: [],
  setForms: (userForms: UserForm[]) => set({ userForms }),
  getForms: async (userId: string) => {
    const { data, error } = await supabase
      .from('userForm')
      .select('*')
      .eq('user', userId);
    if (data) {
      set((state) => ({ userForms: data }));
      return data;
    }
    return null;
  },
  addForm: (form: UserForm) => {
    set((state) => ({ userForms: [...state.userForms, form] }));
  },
}));

export default useFormStore;
