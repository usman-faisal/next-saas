import { Message, Inbox } from 'types/interfaces';
import { create } from 'zustand';

interface ChatStoreState {
  inboxes: Inbox[];
  activeInbox: number;
  messages: Message[];
  addInbox: (inbox: Inbox) => void;
  setInboxes: (inboxes: Inbox[]) => void;
  addChat: (message: Message) => void;
}

const useChatStore = create<ChatStoreState>((set) => ({
  inboxes: [],
  activeInbox: null,
  messages: [],
  addInbox: (inbox) => set((state) => ({ inboxes: [...state.inboxes, inbox] })),
  setInboxes: (inboxes) => set({ inboxes }),
  addChat: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));

useChatStore.subscribe((state) => console.log('New state:', state));

export default useChatStore;
