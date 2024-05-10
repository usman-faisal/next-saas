import supabase from '../supabase/supabaseClient';
import { Match, UserForm } from 'types/interfaces';
import { create } from 'zustand';

interface MatchStore {
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  getMatches: (userId: string) => Promise<Match[]>;
}

const useMatchStore = create<MatchStore>((set) => ({
  matches: [],
  setMatches: (matches) => set({ matches }),
  getMatches: async (userId) => {
    const { data, error } = await supabase()
      .from('userMatches')
      .select('id, user1 (id, name), user2 (id, name), fields')
      .or(`user1.eq.${userId},user2.eq.${userId}`);
    if (error) {
      console.error(error);
      return null;
    }
    set({ matches: data });
    return data
  },
  deleteMatch: async (id: number) => {
    const { data, error } = await supabase()
      .from('userMatches')
      .delete()
      .eq('id', id);
    if (!error) {
      const matches = useMatchStore.getState().matches;
      const newMatches = matches.filter((match) => match.id !== id);
      set({ matches: newMatches });
      return matches
    }
  },
}));

export default useMatchStore;
