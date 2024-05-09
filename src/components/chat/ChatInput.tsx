import { useState } from 'react';
import useAuthStore from 'store/authStore';
import useChatStore from 'store/chatStore';
import supabase from '../../supabase/supabaseClient';

const ChatInput = () => {
  const chatStore = useChatStore();
  const [message, setMessage] = useState('');
  const user = useAuthStore().user;

  async function handleSendMessage() {
    if (message.trim()) {
      chatStore.addChat({
        content: message,
        sender: user.id,
        created_at: new Date().toISOString(),
        inbox: chatStore.activeInbox,
        id: Math.floor(Math.random() * 1000),
      });
      await supabase().from('messages').insert({
        content: message,
        sender: user.id,
        created_at: new Date().toISOString(),
        inbox: chatStore.activeInbox,
      });
      setMessage('');
    }
  }
  if (!chatStore.activeInbox) return null;
  return (
    <div className="flex items-center">
      <input
        type="text"
        disabled={chatStore.activeInbox ? false : true}
        placeholder="Type a message..."
        className="w-full rounded-md border border-gray-400 p-2 focus:border-blue-500 focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        disabled={chatStore.activeInbox ? false : true}
        onClick={handleSendMessage}
        className="ml-2 rounded-md bg-indigo-500 px-4 py-2 text-white"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
