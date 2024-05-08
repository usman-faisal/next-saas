import useAuthStore from 'store/authStore';
import useChatStore from 'store/chatStore';

const ChatHeader = () => {
  const user = useAuthStore().user;
  const chatStore = useChatStore();
  const activeInbox = chatStore.inboxes.find(
    (inbox) => inbox.id === chatStore.activeInbox,
  );
  return (
    <header className="bg-white p-4 text-gray-700">
      <h1 className="text-2xl font-semibold">
        {activeInbox?.user1.id === user?.id
          ? activeInbox?.user2.name
          : activeInbox?.user1.name}
      </h1>
    </header>
  );
};

export default ChatHeader;
