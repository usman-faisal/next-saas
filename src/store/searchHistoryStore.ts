import { SearchHistory } from 'types/interfaces';
import { create } from 'zustand';

interface SearchHistoryState {
  searchHistories: SearchHistory[];
  add: (searchHistory: Omit<SearchHistory, 'ID'>) => void;
  set: (searchHistories: SearchHistory[]) => void;
  reset: () => void;
  // action for fetching data
  fetch: () => Promise<void>;
}

const useSearchHistoryStore = create<SearchHistoryState>()((set) => ({
  searchHistories: [],
  set: (searchHistories) => set({ searchHistories }),
  add: (searchHistory) =>
    set((state) => ({
      searchHistories: [
        ...state.searchHistories,
        {
          ...searchHistory,
          ID: state.searchHistories.length + 1,
        },
      ],
    })),
  reset: () => set({ searchHistories: [] }),
  fetch: async () => {
    const response = await fetch('https://api.example.com/search-history');
    const searchHistories = await response.json();
    set({ searchHistories });
  },
}));

export default useSearchHistoryStore;
