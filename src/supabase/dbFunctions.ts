import supabase from 'supabase';
import { User, UserForm } from 'types/interfaces';

export const createForm = async (data: UserForm, userId: string) => {
  return await supabase
    .from('userForm')
    .insert({
      ...data,
      year: parseInt(data.year),
      user: userId,
    })
    .select();
};

export const updateForm = async (data: UserForm, userId: string) => {
  console.log(data);
  return await supabase
    .from('userForm')
    .update({
      institution: data.institution,
      location: data.location,
      specialty: data.specialty,
      year: parseInt(data.year),
      user: userId,
    })
    .eq('id', data.id)
    .select();
};
