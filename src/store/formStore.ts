import supabase from '../supabase/supabaseClient';
import { UserForm } from 'types/interfaces';
import { create } from 'zustand';

interface FormStore {
  userForm: UserForm;
  setForm: (form: UserForm) => void;
  getForm: (userId: string) => Promise<UserForm>;
}

const useFormStore = create<FormStore>((set) => ({
  userForm: null,
  setForm: (form) => set({ userForm: form }),
  getForm: async (userId) => {
    const { data, error } = await supabase()
      .from('userForm')
      .select('*')
      .eq('user', userId);
    if (error) {
      console.error(error);
      return null;
    }
    useFormStore.getState().setForm(data[0]);
    return data[0];
  },
}));

export default useFormStore;
