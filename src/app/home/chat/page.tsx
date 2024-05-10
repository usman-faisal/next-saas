'use client';

import Card from 'components/card';

import ListMessages from 'components/chat/ListMessages';
import ListInbox from 'components/chat/ListInbox';
import ChatHeader from 'components/chat/ChatHeader';
import ChatInput from 'components/chat/ChatInput';

const Clients = () => {
  return (
    <Card extra="mt-4 flex h-[85vh] overflow-hidden">
      <div className="flex h-full overflow-hidden">
        <div className="w-1/4 border-r border-gray-300 bg-white dark:bg-navy-700">
          <header className="flex items-center justify-between border-b border-gray-300 bg-brand-400 p-4 text-white">
            <h1 className="text-2xl font-semibold text-white">Your Chats</h1>
          </header>

          <ListInbox />
        </div>

        <div className="relative flex-1 dark:!bg-navy-800">
          <ChatHeader />

          <ListMessages />
          <footer className="absolute bottom-0 w-full border-t border-gray-300 bg-white p-4 dark:!bg-navy-800">
            <ChatInput />
          </footer>
        </div>
      </div>
    </Card>
  );
};

export default Clients;
