import supabase from './supabaseClient';

const signupUser = async (email, password, meta_data) => {
  //  { data, error }
  return await supabase().auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        ...meta_data,
      },
    },
  });
};

const signInUser = async (email, password) => {
  return await supabase().auth.signInWithPassword({
    email: email,
    password: password,
  });
};

const signInUserGoogle = async () => {
  return await supabase().auth.signInWithOAuth({
    provider: 'google',
  });
};

const signInUserMicrosoft = async () => {
  return await supabase().auth.signInWithOAuth({
    provider: 'azure',
    options: {
      scopes: 'email',
    },
  });
};

const retreiveUser = async () => {
  return await supabase().auth.getSession();
};

const signOutUser = async () => {
  return await supabase().auth.signOut();
};

export {
  signupUser,
  signInUser,
  signOutUser,
  retreiveUser,
  signInUserGoogle,
  signInUserMicrosoft,
};
