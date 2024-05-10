import { Inbox } from 'types/interfaces';
import supabase from '../supabase/supabaseClient';
import { Match, User, UserForm } from 'types/interfaces';

export const createForm = async (data: UserForm, userId: string) => {
  return await supabase()
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
  return await supabase()
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

export const createInbox = async (data: { user1: string; user2: string }) => {
  return await supabase()
    .from('inbox')
    .insert({
      ...data,
    })
    .select();
};
