import supabase from 'supabase';
import { User, UserForm } from 'types/interfaces';

export const createForm = async (data: UserForm, user: User) => {
  return await supabase
    .from('userForm')
    .insert({
      ...data,
      year: parseInt(data.year),
      user: user.id,
    })
    .select();
};
